import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Grid, Typography, keyframes, styled } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";
import { getListProduct } from "../../api/product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/statusSlice";
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

export default function RelatedProduct() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);

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

  const handleChooseProduct = id => {
    navigate("/product-detail/" + id);
  };

  const handleAddToCart = async id => {
    if (!currentUser) {
      return dispatch(
        showSnackbar({
          severity: "info",
          message: "Bạn phải đăng nhập để thêm vào giỏ hàng",
        })
      );
    }
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
      try {
        const data = await getListProduct();
        setListProduct(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListProduct();
  }, []);
  return (
    <Container>
      <Typography
        sx={{
          fontSize: "24px",
          color: "#111111",
          fontWeight: "600",
          textAlign: "center",
          marginTop: "4%",
          marginBottom: "20px",
        }}
      >
        RELATED PRODUCTS
      </Typography>
      <Slider {...settings}>
        {listProduct.map(product => (
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
