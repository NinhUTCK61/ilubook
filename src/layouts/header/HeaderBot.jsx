import React from "react";
import { AppBar, Container, keyframes } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "./header.css";
import { styled } from "@mui/material/styles";
import {
  listAuthMenu,
  listAuthMenuAdmin,
  listMenu,
  listNotAuthMenu,
} from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { logout } from "../../redux/userSlice";
import { clearCart } from "../../redux/productSlice";

const ListMenu = styled("ul")`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0;
  align-items: center;
`;

const MenuItem = styled("li")`
  position: relative;
  padding: 0 17px;

  &:first-of-type {
    padding-left: 0px;
    padding-right: 17px;
  }
  & > a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
  }

  &:hover a {
    color: #f51167;
  }

  &:hover svg {
    color: #f51167;
  }

  &:hover div {
    display: block;
  }

  &::after {
    top: 10px;
    left: 4px;
    content: "";
    width: 80px;
    height: 30px;
    position: absolute;
    z-index: 1;
  }

  & > svg {
    margin-right: 10px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    top: calc(100% + 80px);
  }

  to {
    opacity: 1;
    top: calc(100% + 20px);
  }
`;

const SubMenu = styled("div")`
  z-index: 1;
  position: absolute;
  width: 220px;
  left: 0;
  top: calc(100% + 20px);
  background: #fff;
  color: #000;
  box-shadow: 2px 7px 20px rgb(0 0 0 / 5%);
  padding: 20px 0;
  display: none;
  animation: ${fadeIn} ease-in 0.3s;
`;

const SubMenuItem = styled("div")`
  cursor: pointer;
  padding: 8px 20px;
  font-weight: 400;
  &:hover {
    color: #f51167;
  }
`;

const isStyle = {
  position: "absolute",
  top: "-24px",
  background: "#f51167",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "10px",
  fontWeight: 700,
  borderRadius: "15px",
  padding: "2px 6px",
};

function RenderSubMenu({ listMenu }) {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      await dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SubMenu>
      {listMenu?.map(e => {
        if (e.key === "log-out") {
          return (
            <SubMenuItem key={e.key} onClick={handleLogout}>
              {e.name}
            </SubMenuItem>
          );
        } else {
          return (
            <Link
              to={e.link}
              key={e.key}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <SubMenuItem>{e.name}</SubMenuItem>
            </Link>
          );
        }
      })}
    </SubMenu>
  );
}

export default function HeaderBot() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#282828",
      }}
    >
      <Container>
        <Box>
          <ListMenu>
            {listMenu?.map(i => (
              <MenuItem key={i.key}>
                <Link to={i.link}>{i.name}</Link>
                {i.isStyle && <div style={isStyle}>SALE</div>}
                {i.subMenu.length > 0 && <RenderSubMenu listMenu={i.subMenu} />}
              </MenuItem>
            ))}
            {!currentUser ? (
              listNotAuthMenu?.map(i => (
                <MenuItem key={i.key}>
                  <Link to={i.link}>{i.name}</Link>
                </MenuItem>
              ))
            ) : (
              <MenuItem>
                <FaRegUser />
                <Link to={"/"}>{currentUser.name}</Link>
                <RenderSubMenu
                  listMenu={
                    currentUser.isAdmin
                      ? listAuthMenuAdmin.concat(listAuthMenu)
                      : listAuthMenu
                  }
                />
              </MenuItem>
            )}
          </ListMenu>
        </Box>
      </Container>
    </AppBar>
  );
}
