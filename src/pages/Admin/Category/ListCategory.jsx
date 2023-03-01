import React, { useEffect, useState } from "react";
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
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaTimes } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  createCategory,
  deleteCategory,
  getInfoCategory,
  getListCategory,
  searchCategory,
  updateCategory,
} from "../../../api/category";

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

export default function ListCategory() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [searchText, setSearchText] = useState("");

  const [listCategory, setListCategory] = useState([]);

  const [idDeleteCategory, setIdDeleteCategory] = useState([]);

  const [idUpdateCategory, setIdUpdateCategory] = useState("");
  const [listArrayChecked, setListArrayChecked] = useState([]);
  const [typeDetele, setTypeDelete] = useState("");

  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenDialogAdd, setIsOpenDialogAdd] = useState(false);
  const [isOpenDialogUpdate, setIsOpenDialogUpdate] = useState(false);

  const [title, setTitle] = useState("");
  const [listProduct, setListProduct] = useState([]);

  const isAllSelected = listCategory.every(i =>
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

  const handleSelectAllClick = () => {
    if (isAllSelected) {
      setListArrayChecked([]);
    } else {
      setListArrayChecked(listCategory?.map(i => i._id));
    }
  };

  const hanldeDelete = async () => {
    try {
      const newListCategory = listCategory.filter(i =>
        typeDetele === "only"
          ? !idDeleteCategory.includes(i._id)
          : !listArrayChecked.includes(i._id)
      );
      setListCategory(newListCategory);
      await deleteCategory({
        listId: typeDetele === "only" ? idDeleteCategory : listArrayChecked,
      });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleOpenCofirmDelete = (id, type) => {
    if (type === "only") {
      setIdDeleteCategory([id]);
    }
    setTypeDelete(type);
    setIsOpenConfirmDelete(true);
  };

  const handleOpenCofirmUpdate = async id => {
    try {
      setIdUpdateCategory(id);
      const data = await getInfoCategory(id);
      setTitle(data.data.title);
      setListProduct(data.data.listProduct);
    } catch (error) {
      console.log(error);
    }
    setIsOpenDialogUpdate(true);
  };

  const handleSearch = async e => {
    if (e.keyCode === 13) {
      try {
        const data = await searchCategory(searchText);
        setListCategory(data.data);
        setSearchText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const hanldeAddCategory = async () => {
    const payloads = {
      title,
    };
    try {
      await createCategory(payloads);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProduct = id => {
    const newListProduct = listProduct.filter(i => i._id !== id);
    setListProduct(newListProduct);
  };

  const handleUpdateProduct = async () => {
    const payloads = {
      title,
      listProduct: listProduct?.map(i => i._id),
    };
    try {
      await updateCategory(payloads, idUpdateCategory);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setIsOpenConfirmDelete(false);
    setIdDeleteCategory([]);
    setListArrayChecked([]);
  };

  const handleCloseDialogAdd = () => {
    setIsOpenDialogAdd(false);
    setTitle("");
  };

  const handleCloseDialogUpdate = () => {
    setIsOpenDialogUpdate(false);
    setIdUpdateCategory("");
    setTitle("");
  };

  useEffect(() => {
    const fetchListCategory = async () => {
      const data = await getListCategory();
      setListCategory(data.data);
    };
    fetchListCategory();
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
                List Category
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <TextField
                  placeholder="Search title category ..."
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
                  Add Category
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
                    <TableCell>Index</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Products</TableCell>
                    <TableCell>Setting</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listCategory?.map((category, index) => (
                    <TableRow key={category?._id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={listArrayChecked.includes(category?._id)}
                          onChange={() => handleCheckboxChange(category?._id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>{index + 1}</div>
                      </TableCell>
                      <TableCell>
                        <div>{category?.title}</div>
                      </TableCell>
                      <TableCell>
                        <div>{category?.listProduct?.length}</div>
                      </TableCell>
                      <TableCell style={{ cursor: "pointer" }}>
                        <FaTimes
                          style={{
                            marginRight: "10px",
                            color: "#f51167",
                            fontSize: "18px",
                          }}
                          onClick={() =>
                            handleOpenCofirmDelete(category?._id, "only")
                          }
                        />
                        <AiFillEdit
                          style={{ color: "#007bff", fontSize: "18px" }}
                          onClick={() => handleOpenCofirmUpdate(category?._id)}
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
          {"Confirm Delete Category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn xóa danh mục này ? Danh mục sẽ không thê khôi phục
            !!!
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

      {/* Modal Add Category */}
      <BootstrapDialog
        onClose={handleCloseDialogAdd}
        aria-labelledby="customized-dialog-title"
        open={isOpenDialogAdd}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDialogAdd}
        >
          Add Category
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box>
            <TextField
              label="Title"
              variant="standard"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
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
          <Button onClick={hanldeAddCategory} variant="contained" size="small">
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
          Update Category
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box mb={2}>
            <TextField
              label="Title"
              variant="standard"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ width: "100%" }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ minWidth: "500px" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Setting</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProduct?.map(product => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={product.image}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                        alt={product.image}
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>
                      <FaTimes
                        style={{
                          color: "#f51167",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRemoveProduct(product._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
    </Container>
  );
}
