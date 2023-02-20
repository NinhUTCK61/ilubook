import React from "react";
import "./home.css";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "aqua",
  height: "70px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "none",
}));

const ItemText = styled("div")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "600",
}));

export default function Feature() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={4} md={4}>
          <Item
            sx={{
              display: {
                borderRadius: 0,
                md: "flex",
                sm: "none",
                xs: "none",
                backgroundColor: "#f8f8f8",
              },
            }}
          >
            <img
              src="assets/img/1.png"
              alt="icon1"
              width="30px"
              height="30px"
              style={{ marginRight: "15px", objectFit: "contain" }}
            />
            <ItemText>Fast Secure Payments</ItemText>
          </Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item
            sx={{
              display: {
                borderRadius: 0,
                md: "flex",
                sm: "none",
                xs: "none",
                backgroundColor: "#f51167",
              },
            }}
          >
            <img
              src="assets/img/2.png"
              alt="icon2"
              width="30px"
              height="30px"
              style={{ marginRight: "15px", objectFit: "contain" }}
            />
            <ItemText sx={{ color: "#fff" }}>Premium Products</ItemText>
          </Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item
            sx={{
              display: {
                borderRadius: 0,
                md: "flex",
                sm: "none",
                xs: "none",
                backgroundColor: "#f8f8f8",
              },
            }}
          >
            <img
              src="assets/img/3.png"
              alt="icon3"
              width="30px"
              height="30px"
              style={{ marginRight: "15px", objectFit: "contain" }}
            />
            <ItemText>Affordable Delivery</ItemText>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
