import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const SearchWrap = styled("div")`
  height: 44px;
  border-radius: 20px;
  padding: 0 19px;
  background: #ccc;
  display: flex;
  align-items: center;
`;

const InputSearch = styled("input")`
  border: none;
  outline: none;
  background: #ccc;
  font-size: 14px;
  width: 100%;
`;

const Menu = styled("div")``;

const MenuItem = styled("div")``;

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          padding: "0 10%",
          paddingTop: "18px",
          paddingBottom: "14px",
          backgroundColor: "#fff",
        }}
      >
        <Toolbar sx={{ backgroundColor: "#fff" }}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={2} sx={{ padding: "0 15px" }}>
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    color: "#111",
                    fontWeight: 600,
                    fontSize: "24px",
                  },
                }}
              >
                ilubooks
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ padding: "0 15px" }}>
              <SearchWrap>
                <InputSearch placeholder="Search on ilubooks ..." />
              </SearchWrap>
            </Grid>
            <Grid item xs={4} sx={{ padding: "0 15px" }}>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "flex-end",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="#000"
                    sx={{ fontSize: "14px", position: "relative" }}
                  >
                    British Pound
                    {/* <Menu>
                      <MenuItem>U.S Dollar</MenuItem>
                      <MenuItem>RTGS Dollar</MenuItem>
                      <MenuItem>SA Rand</MenuItem>
                      <MenuItem>British Pound</MenuItem>
                    </Menu> */}
                  </Typography>
                  <IconButton size="small">
                    <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
                <IconButton size="small">
                  <Badge
                    badgeContent={4}
                    color="warning"
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <FavoriteBorderIcon sx={{ fontSize: 22 }} />
                    <Typography color="#000" sx={{ fontSize: "14px" }}>
                      Wishlist
                    </Typography>
                  </Badge>
                </IconButton>
                <IconButton size="small">
                  <Badge
                    badgeContent={1}
                    color="error"
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 22 }} />
                    <Typography color="#000" sx={{ fontSize: "14px" }}>
                      Shopping Cart
                    </Typography>
                  </Badge>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
