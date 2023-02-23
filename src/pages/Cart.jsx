import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function Cart() {
  const params = useParams();

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    setCartProducts([
      {
        id: "1",
        img: "https://seamaf.com/storage/products/616/ojxRMmDnR7LV5K.webp",
        name: "plane white rectangle gift box (size 2) small",
        quanlity: "5",
        price: "10",
      },
      {
        id: "2",
        img: "https://seamaf.com/storage/products/616/ojxRMmDnR7LV5K.webp",
        name: "plane white rectangle gift box (size 2) small",
        quanlity: "5",
        price: "10",
      },
      {
        id: "3",
        img: "https://seamaf.com/storage/products/616/ojxRMmDnR7LV5K.webp",
        name: "plane white rectangle gift box (size 2) small",
        quanlity: "5",
        price: "10",
      },
    ]);
  }, [params]);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleDeleteCartProduct = id => {
    let obj = {
      product_id: id,
      user_id: user.id,
    };

    axios
      .post("http://localhost:8000/api/cart/delete", obj)
      .catch(err => console.log(err))
      .then(res => alert("xoa san pham thanh cong"));
  };
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
                  {cartProducts.map(cartProduct => (
                    <TableRow key={cartProduct?.id}>
                      <TableCell sx={{ paddingLeft: 0, border: "none" }}>
                        <Link to={`/product-detail/${cartProduct.id}`}>
                          <img
                            src={`${cartProduct.img}`}
                            width="70px"
                            height="70px"
                            alt={cartProduct.id}
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
                        <div>{cartProduct.name}</div>
                        <div
                          style={{
                            marginTop: "2px",
                            fontWeight: 400,
                          }}
                        >
                          ${cartProduct.price}
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
                          <span>-</span>
                          <span> {cartProduct.quanlity}</span>
                          <span>+</span>
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
                            $ 50
                          </span>
                          <FaTimes color="red" size={"16px"} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </BodyCart>
          <BodyTotal>
            <TitleTotal>Total</TitleTotal>
            <PriceTotal>$ 100</PriceTotal>
          </BodyTotal>
        </Box>
        <Box sx={{ flex: 1 }}>Hello</Box>
      </Box>
    </Container>
  );
}
