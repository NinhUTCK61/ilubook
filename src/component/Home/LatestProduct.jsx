import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, keyframes } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { styled } from "@mui/material/styles";
import { getListProduct } from "../../api/product";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  endLoading,
  showSnackbar,
} from "../../redux/statusSlice";
import { errorSystem } from "../../data";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

export default function LatestProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [listProduct, setListProduct] = useState([]);

  const handleChooseProduct = id => {
    navigate("/product-detail/" + id);
  };

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

  const settings = {
    dots: true,
    infinite: true,
    autoplay: "auto",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
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
        LATELEST PRODUCT
      </Typography>
      <Slider {...settings}>
        {listProduct?.map(product => (
          <div key={product._id}>
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              sx={{
                display: {
                  marginLeft: "2%",
                  marginTop: "5%",
                  position: "relative",
                },
              }}
            >
              <img
                className="product-latest"
                src={product.image}
                alt={product.image}
                width="270px"
                height="270px"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  fontSize: "14px",
                  color: "#111",
                  cursor: "pointer",
                }}
                onClick={() => handleChooseProduct(product._id)}
              >
                <p>{product.title}</p>
                <p
                  style={{
                    display: "block",
                    position: "absolute",
                    right: "10px",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  $ {product.price}
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
                  bottom: "54px",
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
            </Grid>
          </div>
        ))}
      </Slider>
    </Container>
  );
}
