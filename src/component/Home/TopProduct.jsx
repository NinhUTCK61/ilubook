import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import "./home.css";
import { Link } from "react-router-dom";

const Item = styled("div")(({ theme }) => ({
  background: "aqua",
}));

export default function TopProduct() {
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
        {products.map(product => (
          <Grid
            key={product.id}
            item
            xs={6}
            sm={4}
            md={3}
            sx={{ display: { marginTop: "4%" } }}
          >
            <div>
              <Link to={`/product-detail/${product.id}`}>
                <img
                  className="product-latest"
                  src={product.img}
                  alt=""
                  width="98%"
                  height="98%"
                />
              </Link>

              <div style={{ display: "flex", position: "relative" }}>
                <p>{product.name}</p>
                <p
                  style={{
                    display: "block",
                    position: "absolute",
                    right: "10px",
                  }}
                >
                  $ {product.price}
                </p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
