import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography, styled, keyframes } from "@mui/material";
import "./home.css";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { getListProduct } from "../../api/product";
import { useDispatch, useSelector } from "react-redux";
import {
  endLoading,
  showSnackbar,
  startLoading,
} from "../../redux/statusSlice";
import { errorSystem } from "../../data";
import { addToCart } from "../../api/user";
import { addToCartSuccess } from "../../redux/productSlice";

const AddToCardText = styled("div")(({ theme }) => ({
  padding: "6px 4px",
  backgroundColor: "#f0f0f0",
  cursor: "pointer",
  textAlign: "center",
  display: "flex",
  alignItems: "flex-start",
  span: {
    display: "none",
  },
  "&:hover": {
    span: {
      animation: `${fadeIn} 0.15s ease-in`,
      display: "block",
    },
  },
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
    margin-top: 8px;
  }

  to {
    opacity: 1;
    margin-top:2px;
  }
`;

export default function TopProduct() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  const [listProduct, setListProduct] = useState([]);

  const handleAddToCart = async id => {
    try {
      const data = await addToCart({
        products: [
          {
            productId: id,
            quantity: 1,
          },
        ],
        userId: currentUser._id,
      });

      if (data.data.status === 200) {
        dispatch(
          showSnackbar({ severity: "success", message: data.data.message })
        );
        dispatch(addToCartSuccess(data.data.user.cart));
      } else {
        dispatch(
          showSnackbar({ severity: "warning", message: data.data.message })
        );
      }
    } catch (error) {
      dispatch(showSnackbar(errorSystem));
    }
  };

  useEffect(() => {
    const fetchListProduct = async () => {
      dispatch(startLoading());
      try {
        const data = await getListProduct();
        setListProduct(data.data);
      } catch (error) {
        dispatch(showSnackbar(errorSystem));
      }
      dispatch(endLoading());
    };
    fetchListProduct();
  }, [dispatch]);

  return (
    <Container>
      <Typography
        sx={{
          display: {
            marginTop: "3%",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "600",
          },
        }}
      >
        BROWSE TOP SELLING PRODUCTS
      </Typography>
      <Grid container spacing={2}>
        {listProduct?.map(product => (
          <Grid
            key={product._id}
            item
            xs={6}
            sm={4}
            md={3}
            sx={{ display: { marginTop: "4%" } }}
          >
            <div style={{ position: "relative" }}>
              <Link to={`/product-detail/${product._id}`}>
                <img
                  className="product-latest"
                  src={product.image}
                  alt=""
                  width="270px"
                  height="270px"
                  style={{ objectFit: "cover" }}
                />
              </Link>

              <div
                style={{
                  display: "flex",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <Link
                  to={`/product-detail/${product._id}`}
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    color: "#111",
                  }}
                >
                  <p>{product?.title}</p>
                </Link>
                <p
                  style={{
                    display: "block",
                    position: "absolute",
                    right: "10px",
                  }}
                >
                  $ {product?.price}
                </p>
              </div>

              {/* new */}
              {product?.isNew && (
                <div
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "14px",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#fff",
                    background: "#50e550",
                    textTransform: "uppercase",
                    padding: "4px 14px",
                    borderRadius: "15px",
                    textAlign: "center",
                  }}
                >
                  new
                </div>
              )}

              {/* icon */}
              <div
                style={{
                  position: "absolute",
                  right: "16px",
                  bottom: "60px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  alignItems: "flex-end",
                }}
              >
                <AddToCardText>
                  <ShoppingBagOutlinedIcon
                    sx={{ fontSize: "20px", color: "#0000008a" }}
                  />
                  <span
                    style={{
                      marginLeft: "40px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleAddToCart(product._id)}
                  >
                    ADD TO CARD
                  </span>
                </AddToCardText>
                <div
                  style={{
                    padding: "6px 4px",
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <FavoriteBorderIcon
                    sx={{ fontSize: "20px", color: "#0000008a" }}
                  />
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
