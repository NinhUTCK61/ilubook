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
import { Link } from "@mui/material";

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

const Menu = styled("div")`
  background-color: #fff;
  position: absolute;
  top: 96%;

  border: 1px solid #000;
  z-index: 1;
`;

const MenuItem = styled("div")(({ theme }) => ({
  color: "#000",
  fontSize: "14px",
  fontWeight: 400,
  padding: "4px 6px",
  cursor: "pointer",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#1976d2",
  },
}));

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
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
              <Typography>
                <Link
                  to={"/"}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                      color: "#111",
                      fontWeight: 600,
                      fontSize: "24px",
                    },
                    fontFamily: "Josefin Sans",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  ilubooks
                </Link>
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
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                >
                  <Typography color="#000" sx={{ fontSize: "14px" }}>
                    U.S Dollar
                  </Typography>
                  <IconButton size="small">
                    <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                  {isOpenMenu && (
                    <Menu>
                      <MenuItem>U.S Dollar</MenuItem>
                      <MenuItem>RTGS Dollar</MenuItem>
                      <MenuItem>SA Rand</MenuItem>
                      <MenuItem>British Pound</MenuItem>
                    </Menu>
                  )}
                </Box>
                <IconButton size="small">
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <FavoriteBorderIcon sx={{ fontSize: 24 }} />
                    <Typography color="#000" sx={{ fontSize: "14px" }}>
                      Wishlist
                    </Typography>
                  </div>
                </IconButton>
                <IconButton size="small">
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <Badge badgeContent={1} color="error">
                      <ShoppingBagOutlinedIcon sx={{ fontSize: 24 }} />
                    </Badge>
                    <Link to="/cart" sx={{ textDecoration: "none" }}>
                      <Typography
                        color="#000"
                        sx={{ fontSize: "14px", marginLeft: "8px" }}
                      >
                        Shopping Cart
                      </Typography>
                    </Link>
                  </div>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
