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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  endLoading,
  showSnackbar,
} from "../../redux/statusSlice";
import { errorSystem } from "../../data";
import { searchProduct } from "../../api/product";

const SearchWrap = styled("div")`
  height: 44px;
  border-radius: 20px;
  padding: 0 19px;
  background: #ccc;
  display: flex;
  align-items: center;
  position: relative;
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

const ListProduct = styled("div")(({ theme }) => ({
  zIndex: "1000",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "red",
  position: "absolute",
  top: "100%",
  width: "88%",
  borderRadius: "5px",
  padding: "0 19px",
  marginTop: "5px",
  background: "#f8f9fa",
}));

const ItemProduct = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxHeight: "250px",
  padding: "0.25rem 1rem",
  borderBottom: "1px solid #dee2e6",
  "&>img": {
    display: "block",
    width: "50px",
    height: "50px",
    objectFit: "cover",
  },
  "&>span": {
    color: "#343a40",
  },
}));

export default function Header() {
  const dispatch = useDispatch();

  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const { listProduct } = useSelector(state => state.product);

  const [searchProductText, setSearchProductText] = React.useState("");
  const [resultProduct, setResultProduct] = React.useState([]);
  const [typingTimeout, setTypingTimeout] = React.useState(0);

  const handleInputChange = e => {
    setSearchProductText(e.target.value);

    clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        handleSearchProduct(e.target.value);
      }, 2000)
    );
  };

  const handleSearchProduct = async textSearch => {
    if (textSearch !== "") {
      dispatch(startLoading());
      try {
        const data = await searchProduct(textSearch);
        if (data.data.length === 0) {
          dispatch(
            showSnackbar({
              severity: "info",
              message: "Không có kết quả tìm kiếm",
            })
          );
        }
        setResultProduct(data.data);
      } catch (error) {
        dispatch(showSnackbar(errorSystem));
      }
      dispatch(endLoading());
    } else {
      setResultProduct([]);
    }
  };

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
                  style={{
                    xs: "none",
                    sm: "block",
                    color: "#111",
                    fontWeight: 600,
                    fontSize: "24px",
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
                <InputSearch
                  placeholder="Search on ilubooks ..."
                  value={searchProductText}
                  onChange={handleInputChange}
                />
                <ListProduct>
                  {resultProduct?.length > 0 &&
                    resultProduct?.map(product => (
                      <Link
                        to={`/product-detail/${product?._id}`}
                        key={product?._id}
                      >
                        <ItemProduct>
                          <img src={product?.image} alt={product?._id} />
                          <span>{product?.title}</span>
                        </ItemProduct>
                      </Link>
                    ))}
                </ListProduct>
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
                  <Link
                    to="/cart"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                      <Badge badgeContent={listProduct?.length} color="error">
                        <ShoppingBagOutlinedIcon
                          sx={{ fontSize: 24, color: "#000" }}
                        />
                      </Badge>
                      <Typography
                        color="#000"
                        sx={{ fontSize: "14px", marginLeft: "8px" }}
                      >
                        Shopping Cart
                      </Typography>
                    </div>
                  </Link>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
