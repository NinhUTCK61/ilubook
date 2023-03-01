import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  TextareaAutosize,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaTimes } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import {
  addToCategory,
  createProduct,
  deleteProduct,
  getInfoProduct,
  getListProduct,
  searchProduct,
  updateProduct,
} from "../../../api/product";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { storage } from "../../../helper/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { shortenString } from "../../../helper";
import { getListCategory } from "../../../api/category";

const BodyCart = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "#f0f0f0",
  borderRadius: "27px",
  padding: "40px 34px",
  boxSizing: "border-box",
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
}

const StyledTextareaAutosize = styled(TextareaAutosize)`
  border-radius: 4px;
  padding: 8px;
  outline: none;
  resize: none;
  flex: 1;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.23);
  width: 100%;
`;

export default function ListProduct() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [searchText, setSearchText] = useState("");

  const [listProduct, setListProduct] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState("");

  const [idDeleteProduct, setIdDeleteProduct] = useState([]);
  const [idUpdateProduct, setIdUpdateProduct] = useState("");
  const [listArrayChecked, setListArrayChecked] = useState([]);
  const [typeDetele, setTypeDelete] = useState("");

  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenDialogAdd, setIsOpenDialogAdd] = useState(false);
  const [isOpenDialogUpdate, setIsOpenDialogUpdate] = useState(false);
  const [isOpenDialogAddToCategory, setIsOpenDialogAddToCategory] =
    useState(false);

  const [image, setImage] = useState("");
  const [listDiffImg, setListDiffImg] = useState("");

  const [isNew, setIsNew] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [shipping, setShipping] = useState("");

  const isAllSelected = listProduct.every(i =>
    listArrayChecked.includes(i._id)
  );

  const handleCheckboxChange = id => {
    const index = listArrayChecked.indexOf(id);
    if (index !== -1) {
      const newArray = [...listArrayChecked];
      newArray.splice(index, 1);
      setListArrayChecked(newArray);
    } else {
      setListArrayChecked(prevArray => [...prevArray, id]);
    }
  };

  const handleCheckboxNewChange = event => {
    setIsNew(event.target.checked);
  };

  const handleSelectAllClick = () => {
    if (isAllSelected) {
      setListArrayChecked([]);
    } else {
      setListArrayChecked(listProduct?.map(i => i._id));
    }
  };

  const hanldeDelete = async () => {
    try {
      const newListProduct = listProduct.filter(i =>
        typeDetele === "only"
          ? !idDeleteProduct.includes(i._id)
          : !listArrayChecked.includes(i._id)
      );
      setListProduct(newListProduct);
      await deleteProduct({
        listId: typeDetele === "only" ? idDeleteProduct : listArrayChecked,
      });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleOpenCofirmDelete = (id, type) => {
    if (type === "only") {
      setIdDeleteProduct([id]);
    }
    setTypeDelete(type);
    setIsOpenConfirmDelete(true);
  };

  const handleOpenCofirmUpdate = async id => {
    try {
      setIdUpdateProduct(id);
      const data = await getInfoProduct(id);
      setTitle(data.data.title);
      setPrice(data.data.price);
      setDescription(data.data.description);
      setShipping(data.data.shipping);
      setIsNew(data.data.isNew);
      setImage(data.data.image);
      setListDiffImg(data.data.listDiffImg);
    } catch (error) {
      console.log(error);
    }
    setIsOpenDialogUpdate(true);
  };

  const handleSearch = async e => {
    if (e.keyCode === 13) {
      try {
        const data = await searchProduct(searchText);
        setListProduct(data.data);
        setSearchText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUploadImage = e => {
    const file = e.target.files[0];
    const id = Date.now(); // generate random id
    const storageRef = ref(storage, `product/${file.name}-${id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      error => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImage(downloadURL);
        });
      }
    );
  };

  const handleUploadDiffImage = e => {
    const files = e.target.files;
    const uploadPromises = [];

    // Iterate over each file and upload it
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = Date.now(); // generate random id
      const storageRef = ref(storage, `product/${file.name}-${id}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const uploadPromise = new Promise((resolve, reject) => {
        // Listen for state changes to track upload progress
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`File ${i + 1} progress: ${progress}%`);
          },
          error => {
            console.log(`File ${i + 1} upload failed: ${error}`);
            reject(error);
          },
          () => {
            // Get the download URL and resolve the promise
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              resolve(downloadURL);
            });
          }
        );
      });

      uploadPromises.push(uploadPromise);
    }
    Promise.all(uploadPromises)
      .then(downloadURLs => {
        setListDiffImg([...listDiffImg, ...downloadURLs]);
      })
      .catch(error => {
        console.log(`File upload failed: ${error}`);
      });
  };

  const removeImage = () => {
    setImage("");
  };

  const removeListDiffImg = index => {
    const newListDiffImg = [...listDiffImg];
    newListDiffImg.splice(index, 1);
    setListDiffImg(newListDiffImg);
  };

  const hanldeAddProduct = async () => {
    const payloads = {
      title,
      price,
      quantity,
      shipping,
      isNew,
      description,
      image,
      listDiffImg,
    };
    try {
      await createProduct(payloads);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async () => {
    const payloads = {
      title,
      price,
      quantity,
      shipping,
      isNew,
      description,
      image,
      listDiffImg,
    };
    try {
      await updateProduct(payloads, idUpdateProduct);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCategory = async () => {
    try {
      await addToCategory({
        idCategory: category,
        idProduct: listArrayChecked,
      });
      handleCloseDialogAddToCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setIsOpenConfirmDelete(false);
    setIdDeleteProduct([]);
    setListArrayChecked([]);
  };

  const handleCloseDialogAdd = () => {
    setIsOpenDialogAdd(false);
    setTitle("");
    setPrice("");
    setQuantity(1);
    setShipping("");
    setIsNew(false);
    setDescription("");
    setImage("");
    setListDiffImg([]);
  };

  const handleCloseDialogUpdate = () => {
    setIsOpenDialogUpdate(false);
    setIdUpdateProduct("");
    setTitle("");
    setPrice("");
    setQuantity(1);
    setShipping("");
    setIsNew(false);
    setDescription("");
    setImage("");
    setListDiffImg([]);
  };

  const handleCloseDialogAddToCategory = () => {
    setIsOpenDialogAddToCategory(false);
    setListArrayChecked([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataProduct = await getListProduct();
      const dataCategory = await getListCategory();
      setListProduct(dataProduct.data);
      setListCategory(dataCategory.data);
      setCategory(dataCategory?.data[0]?._id);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Box sx={{ display: "flex", margin: "105px 0" }}>
        <Box sx={{ flex: 2 }}>
          <BodyCart>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "30px",
                }}
              >
                List Product
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <TextField
                  placeholder="Search title product ..."
                  size="small"
                  width="100%"
                  variant="standard"
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setIsOpenDialogAdd(true)}
                >
                  Add Product
                </Button>
              </div>
            </div>

            <TableContainer sx={{ width: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isAllSelected}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>

                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Shipping</TableCell>
                    <TableCell>Setting</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listProduct?.map((cartProduct, index) => (
                    <TableRow key={cartProduct?._id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={listArrayChecked.includes(cartProduct?._id)}
                          onChange={() =>
                            handleCheckboxChange(cartProduct?._id)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/product-detail/${cartProduct?._id}`}>
                          <img
                            src={`${cartProduct?.image}`}
                            width="70px"
                            height="70px"
                            alt={cartProduct?._id}
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div>{cartProduct?.title}</div>
                      </TableCell>
                      <TableCell>
                        <div>{cartProduct?.price}</div>
                      </TableCell>
                      <TableCell>
                        <div>{cartProduct?.quantity}</div>
                      </TableCell>
                      <TableCell>
                        <div>{cartProduct?.description}</div>
                      </TableCell>
                      <TableCell>
                        <div>{cartProduct?.shipping}</div>
                      </TableCell>
                      <TableCell style={{ cursor: "pointer" }}>
                        <FaTimes
                          style={{
                            marginRight: "10px",
                            color: "#f51167",
                            fontSize: "18px",
                          }}
                          onClick={() =>
                            handleOpenCofirmDelete(cartProduct?._id, "only")
                          }
                        />
                        <AiFillEdit
                          style={{ color: "#007bff", fontSize: "18px" }}
                          onClick={() =>
                            handleOpenCofirmUpdate(cartProduct?._id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {listArrayChecked?.length > 0 && (
              <Box
                marginTop="20px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="40px"
              >
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => handleOpenCofirmDelete("", "multi")}
                >
                  Xóa tất cả
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setIsOpenDialogAddToCategory(true)}
                >
                  Thêm vào danh mục
                </Button>
              </Box>
            )}
          </BodyCart>
        </Box>
      </Box>

      {/* Confirm Delete */}
      <Dialog
        fullScreen={fullScreen}
        open={isOpenConfirmDelete}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm Delete Product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn xóa sản phẩm này ? Sản phẩm sẽ không thê khôi phục,
            đồng thời tất cả sản phẩm trong giỏ hàng của khách hàng, cũng như
            sản phẩm trong các danh mục sẽ bị xóa !!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <Button onClick={hanldeDelete} variant="contained" size="small">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Add Product */}
      <BootstrapDialog
        onClose={handleCloseDialogAdd}
        aria-labelledby="customized-dialog-title"
        open={isOpenDialogAdd}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDialogAdd}
        >
          Add Product
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box display="flex" justifyContent="space-between" gap="40px">
            <TextField
              label="Title"
              variant="standard"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              label="Price"
              variant="standard"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between" gap="40px">
            <TextField
              label="Quantity"
              variant="standard"
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
            <TextField
              label="Shipping"
              variant="standard"
              value={shipping}
              onChange={e => setShipping(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <FormControlLabel
              control={
                <Checkbox checked={isNew} onChange={handleCheckboxNewChange} />
              }
              label="New"
            />
          </Box>
          <Box mt={2}>
            <StyledTextareaAutosize
              placeholder="Description"
              minRows={10}
              maxRows={15}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent={"space-between"}>
            <Box>
              {image ? (
                <Box>
                  <Box>
                    <div>Image:</div>
                  </Box>
                  <Box mt={2} display="flex" alignContent="center" gap="10px">
                    <a
                      href={image}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none", color: "#000000de" }}
                    >
                      {shortenString(image)}
                    </a>
                    <FaTimes
                      style={{ color: "#f51167", cursor: "pointer" }}
                      onClick={removeImage}
                    />
                  </Box>
                </Box>
              ) : (
                <div>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="upload-image"
                    type="file"
                    onChange={e => handleUploadImage(e)}
                  />
                  <label htmlFor="upload-image">
                    <Button variant="contained" component="span" size="small">
                      Upload Image
                    </Button>
                  </label>
                </div>
              )}
            </Box>

            <Box>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-diff-image"
                multiple
                type="file"
                onChange={handleUploadDiffImage}
              />
              <label htmlFor="upload-diff-image">
                <Button variant="contained" component="span" size="small">
                  Upload Diff Image
                </Button>
              </label>

              {listDiffImg?.length > 0 && (
                <Box mt={2}>
                  <Box display="flex" alignContent="center" gap="10px">
                    <div>List Diff Image: </div>
                  </Box>
                  {listDiffImg?.map((e, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignContent="center"
                      gap="10px"
                      mt={2}
                    >
                      <a
                        href={e}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none", color: "#000000de" }}
                      >
                        {shortenString(e)}
                      </a>

                      <FaTimes
                        style={{ color: "#f51167", cursor: "pointer" }}
                        onClick={() => removeListDiffImg(index)}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialogAdd}
            variant="contained"
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <Button onClick={hanldeAddProduct} variant="contained" size="small">
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* Modal Update Product */}
      <BootstrapDialog
        onClose={handleCloseDialogUpdate}
        aria-labelledby="customized-dialog-title"
        open={isOpenDialogUpdate}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDialogUpdate}
        >
          Update Product
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box display="flex" justifyContent="space-between" gap="40px">
            <TextField
              label="Title"
              variant="standard"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              label="Price"
              variant="standard"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between" gap="40px">
            <TextField
              label="Quantity"
              variant="standard"
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
            <TextField
              label="Shipping"
              variant="standard"
              value={shipping}
              onChange={e => setShipping(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <FormControlLabel
              control={
                <Checkbox checked={isNew} onChange={handleCheckboxNewChange} />
              }
              label="New"
            />
          </Box>
          <Box mt={2}>
            <StyledTextareaAutosize
              placeholder="Description"
              minRows={10}
              maxRows={15}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent={"space-between"}>
            <Box>
              {image ? (
                <Box>
                  <Box>
                    <div>Image:</div>
                  </Box>
                  <Box mt={2} display="flex" alignContent="center" gap="10px">
                    <a
                      href={image}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none", color: "#000000de" }}
                    >
                      {shortenString(image)}
                    </a>
                    <FaTimes
                      style={{ color: "#f51167", cursor: "pointer" }}
                      onClick={removeImage}
                    />
                  </Box>
                </Box>
              ) : (
                <div>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="upload-image"
                    type="file"
                    onChange={e => handleUploadImage(e)}
                  />
                  <label htmlFor="upload-image">
                    <Button variant="contained" component="span" size="small">
                      Upload Image
                    </Button>
                  </label>
                </div>
              )}
            </Box>

            <Box>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-diff-image"
                multiple
                type="file"
                onChange={handleUploadDiffImage}
              />
              <label htmlFor="upload-diff-image">
                <Button variant="contained" component="span" size="small">
                  Upload Diff Image
                </Button>
              </label>

              {listDiffImg?.length > 0 && (
                <Box mt={2}>
                  <Box display="flex" alignContent="center" gap="10px">
                    <div>List Diff Image: </div>
                  </Box>
                  {listDiffImg?.map((e, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignContent="center"
                      gap="10px"
                      mt={2}
                    >
                      <a
                        href={e}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none", color: "#000000de" }}
                      >
                        {shortenString(e)}
                      </a>

                      <FaTimes
                        style={{ color: "#f51167", cursor: "pointer" }}
                        onClick={() => removeListDiffImg(index)}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialogUpdate}
            variant="contained"
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProduct}
            variant="contained"
            size="small"
          >
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* Modal Add To Category */}
      <BootstrapDialog
        onClose={handleCloseDialogAddToCategory}
        aria-labelledby="customized-dialog-title"
        open={isOpenDialogAddToCategory}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDialogAddToCategory}
        >
          Add Product To Category
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={category}
            label="Age"
            onChange={e => setCategory(e.target.value)}
          >
            {listCategory?.map(e => (
              <MenuItem value={e._id} key={e._id}>
                {e.title}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialogAddToCategory}
            variant="contained"
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToCategory}
            variant="contained"
            size="small"
          >
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Container>
  );
}
