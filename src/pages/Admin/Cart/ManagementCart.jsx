import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import {
  Box,
  Container,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import { searchUser, updateToCart } from "../../../api/user";
import { useDispatch } from "react-redux";
import {
  endLoading,
  showSnackbar,
  startLoading,
} from "../../../redux/statusSlice";
import { errorSystem } from "../../../data";

const BodyCart = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "#f0f0f0",
  borderRadius: "27px",
  padding: "40px 34px",
  boxSizing: "border-box",
}));

export default function ManagementCart() {
  const dispatch = useDispatch();

  const [listProduct, setListProduct] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [searchText, setSearchText] = useState("");
  const [isOpenCart, setIsOpenCart] = useState(false);

  const handleQuantityChange = (index, newQuantity) => {
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    const newListProduct = [...listProduct];
    newListProduct[index].quantity = newQuantity;
    setListProduct(newListProduct);
  };

  const handleRemoveProduct = async (index, id) => {
    const newListProduct = [...listProduct];
    newListProduct.splice(index, 1);
    setListProduct(newListProduct);
  };

  const handleSaveYourCart = async () => {
    dispatch(startLoading());
    const oldListProduct = JSON.parse(localStorage.getItem("initCart")).map(
      i => ({
        quantity: i.quantity,
        productId: i.product._id,
      })
    );

    const newListProduct = listProduct?.map(i => ({
      quantity: i.quantity,
      productId: i.product._id,
    }));

    for (let i = 0; i < newListProduct.length; i++) {
      for (let j = 0; j < oldListProduct.length; j++) {
        if (newListProduct[i].productId === oldListProduct[j].productId) {
          newListProduct[i].quantity -= oldListProduct[j].quantity;
          break;
        }
      }
    }

    try {
      const data = await updateToCart({
        userId: currentUser._id,
        products: newListProduct,
      });
      if (data?.data.error) {
        dispatch(
          showSnackbar({ severity: "warning", message: data.data.error })
        );
      } else {
        dispatch(
          showSnackbar({ severity: "success", message: data.data.message })
        );
      }
    } catch (error) {
      dispatch(showSnackbar(errorSystem));
    }
    dispatch(endLoading());
  };

  const handleSearch = async e => {
    if (e.keyCode === 13) {
      dispatch(startLoading());
      try {
        const data = await searchUser(searchText);
        if (data.data.length === 0) {
          dispatch(
            showSnackbar({
              severity: "info",
              message: "Không có kết quả tìm kiếm",
            })
          );
        }
        setListUser(data.data);
        setSearchText("");
        setIsOpenCart(false);
      } catch (error) {
        dispatch(showSnackbar(errorSystem));
      }
      dispatch(endLoading());
    }
  };

  const handleEidtCartUser = user => {
    setIsOpenCart(true);
    setCurrentUser(user);
    if (user.cart?.length === 0) {
      dispatch(
        showSnackbar({
          severity: "info",
          message: "Hiện tại chưa có gì trong giỏ hàng",
        })
      );
    }
    setListProduct(user.cart);
    localStorage.setItem("initCart", JSON.stringify(user.cart));
  };

  return (
    <Container>
      <Box sx={{ display: "flex", margin: "105px 0" }}>
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
              Management Cart
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <TextField
                placeholder="Search email users ..."
                size="small"
                width="100%"
                variant="standard"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
          {listUser?.length > 0 &&
            (isOpenCart ? (
              <>
                <TableContainer sx={{ width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            paddingLeft: 0,
                            fontSize: "12px",
                            fontFamily: "Josefin Sans",
                            border: "none",
                          }}
                        >
                          Product
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "12px",
                            fontFamily: "Josefin Sans",
                            border: "none",
                          }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "12px",
                            fontFamily: "Josefin Sans",
                            border: "none",
                          }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "12px",
                            fontFamily: "Josefin Sans",
                            border: "none",
                          }}
                        >
                          Setting
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {listProduct?.map((cartProduct, index) => (
                        <TableRow key={cartProduct?._id}>
                          <TableCell>
                            <Link
                              to={`/product-detail/${cartProduct?.product?.id}`}
                            >
                              <img
                                src={`${cartProduct?.product?.image}`}
                                width="100px"
                                height="100px"
                                alt={cartProduct?._id}
                              />
                            </Link>
                          </TableCell>
                          <TableCell>
                            <div>{cartProduct?.product?.title}</div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                background: "#fff",
                                justifyContent: "space-between",
                                gap: "10px",
                                height: "36px",
                                border: " 1px solid #ddd",
                                padding: "0 15px",
                                borderRadius: "40px",
                                cursor: "pointer",
                                width: "min-content",
                              }}
                            >
                              <span
                                onClick={() =>
                                  handleQuantityChange(
                                    index,
                                    cartProduct.quantity - 1
                                  )
                                }
                              >
                                -
                              </span>
                              <span> {cartProduct.quantity}</span>
                              <span
                                onClick={() =>
                                  handleQuantityChange(
                                    index,
                                    cartProduct.quantity + 1
                                  )
                                }
                              >
                                +
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <FaTimes
                              style={{
                                marginRight: "10px",
                                color: "#f51167",
                                fontSize: "18px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleRemoveProduct(
                                  index,
                                  cartProduct.product._id
                                )
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {listProduct?.length > 0 && (
                  <Box mt={2} display="flex" justifyContent="center" gap="20px">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleSaveYourCart}
                    >
                      Save Cart
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <TableContainer sx={{ width: "100%" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Setting</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {listUser?.map(user => (
                      <TableRow key={user?._id}>
                        <TableCell>
                          <div>{user?.email}</div>
                        </TableCell>

                        <TableCell>{user?.name}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            startIcon={<BiEdit />}
                            size="small"
                            onClick={() => handleEidtCartUser(user)}
                          >
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
        </BodyCart>
      </Box>
    </Container>
  );
}
