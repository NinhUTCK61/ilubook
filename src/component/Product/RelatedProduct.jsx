import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./home.css";

export default function RelatedProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      const dataProducts = [
        {
          id: "1",
          img: "https://seamaf.com/storage/products/614/QvOq4G5hkxvHv9.webp",
          name: "Paper flags",
          price: "40.59",
        },
        {
          id: "2",
          img: "https://seamaf.com/storage/products/613/GcRe2ZirwM8158.webp",
          name: "ring basket brown (small)",
          price: "40.59",
        },
        {
          id: "3",
          img: "https://seamaf.com/storage/products/611/1cfDRxjPPuABsC.webp",
          name: "ring basket brown (small)",
          price: "40.59",
        },
        {
          id: "4",
          img: "https://seamaf.com/storage/products/617/PmHvUsij2eMb6w.webp",
          name: "kids paper cups",
          price: "40.59",
        },
        {
          id: "5",
          img: "https://seamaf.com/frontend/img/no-image.png",
          name: "Stainless steal earring hooks",
          price: "40.59",
        },
      ];
      setProducts(dataProducts);
    };
    getProducts();
  }, []);

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
        {products.map(product => (
          <div key={product.id}>
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
              {/* <Link to={`/product-detail/${product.id}`}> */}
              <img
                className="product-latest"
                src={product.img}
                alt={product.img}
                width="98%"
                height="98%"
              />
              {/* </Link> */}
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  fontSize: "14px",
                  color: "#111",
                }}
              >
                <p>{product.name}</p>
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
                <div
                  style={{
                    padding: "6px 4px",
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <ShoppingBagOutlinedIcon
                    sx={{ fontSize: "20px", color: "#0000008a" }}
                  />
                </div>
                {/* <div
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    minWidth: "150px",
                  }}
                >
                  <ShoppingBagOutlinedIcon
                    sx={{ fontSize: "20px", color: "#0000008a" }}
                  />
                  <span
                    style={{
                      marginTop: "2px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      transition: "all 0.4s ease 0.3s",
                    }}
                  >
                    ADD TO CARD
                  </span>
                </div> */}
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
