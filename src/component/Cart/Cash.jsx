import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
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
  MenuItem,
  Select,
} from "@mui/material";
import { getInfoUser, updateToCart } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { addToCartSuccess } from "../../redux/productSlice";
import { listOptionShipping } from "../../data";
import {
  endLoading,
  showSnackbar,
  startLoading,
} from "../../redux/statusSlice";

const BodyCart = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "#f0f0f0",
  borderTopLeftRadius: "27px",
  borderTopRightRadius: "27px",
  padding: "40px 34px",
  boxSizing: "border-box",
}));

const BodyTotal = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "#f51167",
  marginBottom: "7%",
  paddingTop: "2%",
  paddingBottom: "2%",
  paddingRight: "34px",
  color: "#fff",
  display: "flex",
  justifyContent: "flex-end",
  borderBottomLeftRadius: "27px",
  borderBottomRightRadius: "27px",
  boxSizing: "border-box",
}));

const TitleTotal = styled("div")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "700",
  paddingLeft: "55%",
}));

const PriceTotal = styled("div")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "700",
  paddingLeft: "75px",
}));

const WrapEnterCode = styled("div")(({ theme }) => ({
  padding: "0 15px",
  boxSizing: "border-box",
}));

const EnterCode = styled("div")(({ theme }) => ({
  border: "1px solid #f0f0f0",
  padding: "14px 24px",
  borderRadius: "80px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "&>span": {
    color: "#f51167",
    fontWeight: 700,
    cursor: "pointer",
  },
}));

const EnterCodeInput = styled("input")(({ theme }) => ({
  outline: "none",
  border: "none",
  fontSize: "16px",
}));

const WrapOptionShipping = styled("div")(({ theme }) => ({
  marginTop: "20px",
  padding: "0 15px",
  boxSizing: "border-box",
  "&>div": {
    border: "1px solid #f0f0f0",
    borderRadius: "20px",
    padding: "14px 24px",
    "&>span": {
      color: "#111",
      fontWeight: 700,
    },
  },
}));

const SelectOptionShipping = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "24px",
  gap: "20px",
  "&>span": {
    fontSize: "16px",
    color: "#111",
    fontWeight: "600",
  },
}));

const ButtonCaculate = styled("div")(({ theme }) => ({
  width: "max-content",
  marginTop: "20px",
  borderRadius: "5px",
  background: "#343a40",
  color: "#fff !important",
  padding: "10px 12px",
  cursor: "pointer",
}));

const WrapButton = styled("div")(({ theme }) => ({
  marginTop: "20px",
  padding: "0 15px",
  "&>a>div": {
    background: "#f51167 !important",
  },
}));

const ShippingButton = styled("div")(({ theme }) => ({
  padding: "16px 0",
  color: "white",
  textAlign: "center",
  backgroundColor: "#413a3a",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "20px",
}));

export default function Cash({ currentUser }) {
  const dispatch = useDispatch();
  const initCart = useSelector(state => state.product.listProduct);

  const [listProduct, setListProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [unitShipping, setUnitShipping] = useState(10);

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
    const oldListProduct = initCart?.map(i => ({
      quantity: i.quantity,
      productId: i.product._id,
    }));

    const newListProduct = listProduct?.map(i => ({
      quantity: i.quantity,
      productId: i.product._id,
    }));

    for (let i = 0; i < newListProduct.length; i++) {
      for (let j = 0; j < oldListProduct?.length; j++) {
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
      console.log(data.data);
      if (data?.data.error) {
        dispatch(
          showSnackbar({ severity: "warning", message: data.data.error })
        );
      } else {
        dispatch(
          showSnackbar({ severity: "success", message: data.data.message })
        );
      }

      dispatch(addToCartSuccess(data.data.user.cart));
    } catch (error) {
      console.log(error);
    }
    dispatch(endLoading());
  };

  useEffect(() => {
    const handleSumTotal = () => {
      const priceProduct = listProduct
        ?.map(e => ({
          quantity: e?.quantity,
          price: Number(e?.product?.price),
        }))
        .reduce((a, b) => a + b.price * b.quantity, 0);

      const totalPrice = (Number(priceProduct) + Number(unitShipping)).toFixed(
        2
      );

      setTotalPrice(totalPrice);
    };
    handleSumTotal();
  }, [listProduct, unitShipping]);

  useEffect(() => {
    const getListProduct = async () => {
      try {
        const data = await getInfoUser(currentUser?._id);
        setListProduct(data.data?.cart);
      } catch (error) {
        console.log(error);
      }
    };
    getListProduct();
  }, [currentUser]);

  return (
    <Container>
      <Box sx={{ display: "flex", margin: "105px 0" }}>
        <Box sx={{ flex: 2 }}>
          <BodyCart>
            <div
              style={{
                fontWeight: "700",
                fontSize: "30px",
                marginBottom: "24px",
              }}
            >
              Your Cart
            </div>
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
                      Size
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingRight: 0,
                        fontSize: "12px",
                        fontFamily: "Josefin Sans",
                        border: "none",
                      }}
                    >
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listProduct?.map((cartProduct, index) => (
                    <TableRow key={cartProduct?._id}>
                      <TableCell sx={{ paddingLeft: 0, border: "none" }}>
                        <Link
                          to={`/product-detail/${cartProduct?.product?.id}`}
                        >
                          <img
                            src={`${cartProduct?.product?.image}`}
                            width="70px"
                            height="70px"
                            alt={cartProduct?._id}
                          />
                        </Link>
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          fontFamily: "Josefin Sans",
                          border: "none",
                        }}
                      >
                        <div>{cartProduct?.product?.title}</div>
                        <div
                          style={{
                            marginTop: "2px",
                            fontWeight: 400,
                          }}
                        >
                          ${cartProduct?.product?.price}
                        </div>
                      </TableCell>
                      <TableCell
                        style={{
                          border: "none",
                        }}
                      >
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
                      <TableCell
                        style={{
                          border: "none",
                        }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          paddingRight: 0,
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "18px",
                              color: "#414141",
                              fontFamily: "Josefin Sans",
                            }}
                          >
                            $
                            {(
                              Number(cartProduct?.product?.price) *
                              cartProduct?.quantity
                            ).toFixed(2)}
                          </span>
                          <FaTimes
                            color="red"
                            size={"16px"}
                            onClick={() =>
                              handleRemoveProduct(
                                index,
                                cartProduct.product._id
                              )
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box>
                <div
                  style={{
                    fontFamily: "Josefin Sans",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{"Shipping (Fixed)"}</span>
                  {/* <span>
                    <FaTimes color="red" size={"16px"} />
                  </span> */}
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#414141",
                    }}
                  >
                    $ {unitShipping}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "Josefin Sans",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#212529",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  <span>{"New Subtotal"}</span>
                  <span>{totalPrice}</span>
                </div>
              </Box>
            </TableContainer>
          </BodyCart>
          <BodyTotal>
            <TitleTotal>Total</TitleTotal>
            <PriceTotal>$ {totalPrice}</PriceTotal>
          </BodyTotal>
        </Box>
        <Box sx={{ flex: 1 }}>
          <WrapEnterCode>
            <EnterCode>
              <EnterCodeInput placeholder="Enter promo code" />
              <span>SUBMIT</span>
            </EnterCode>
          </WrapEnterCode>
          <WrapOptionShipping>
            <div>
              <span>SHIPPING OPTIONS</span>
              <SelectOptionShipping>
                <span>Select Zone</span>

                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  size="small"
                  sx={{ flex: "1" }}
                  onChange={e => setUnitShipping(e.target.value)}
                  value={unitShipping}
                >
                  {listOptionShipping.map(option => (
                    <MenuItem key={option.key} value={option.price}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </SelectOptionShipping>
              <ButtonCaculate onClick={handleSaveYourCart}>
                Save your cart
              </ButtonCaculate>
            </div>
          </WrapOptionShipping>
          <WrapButton>
            <ShippingButton>PROCEED TO CHECKOUT</ShippingButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ShippingButton>CONTINUE SHIPPING</ShippingButton>
            </Link>
          </WrapButton>
        </Box>
      </Box>
    </Container>
  );
}
