import React from "react";
import { AppBar, Container } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "./header.css";
import { styled } from "@mui/material/styles";

import Badge from "@mui/material/Badge";

const ListMenu = styled("ul")`
  display: flex;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0;
`;

const MenuItem = styled("li")`
  position: relative;
  padding: 0 17px;
  &:first-child {
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

  &:hover div {
    display: block;
  }

  &::after {
    top: 20px;
    left: 4px;
    content: "";
    width: 80px;
    height: 30px;
    position: absolute;
    z-index: 1;
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
  padding-top: 20px;
  display: none;
`;

const SubMenuItem = styled("div")`
  cursor: pointer;
  padding: 8px 20px;
  font-weight: 400;
  &:hover {
    color: #f51167;
  }
`;

export default function HeaderBot() {
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
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/shop">Our Shop</Link>
              <SubMenu>
                <SubMenuItem>Beading Tools</SubMenuItem>
                <SubMenuItem>Beading Tools</SubMenuItem>
                <SubMenuItem>Beading Tools</SubMenuItem>
                <SubMenuItem>Beading Tools</SubMenuItem>
                <SubMenuItem>Beading Tools</SubMenuItem>
                <SubMenuItem>Beading Tools</SubMenuItem>
                <SubMenuItem>Beading Tools</SubMenuItem>
                <SubMenuItem>Beading Tools</SubMenuItem>
              </SubMenu>
            </MenuItem>
            <MenuItem>
              <Link to="#">On Sale</Link>
              <div
                style={{
                  position: "absolute",
                  top: "-24px",
                  background: "#f51167",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "10px",
                  fontWeight: 700,
                  borderRadius: "15px",
                  fontSize: "12px",
                  padding: "2px 6px",
                }}
              >
                SALE
              </div>
            </MenuItem>
            <MenuItem>
              <Link to="#">Our Services</Link>
            </MenuItem>
            <MenuItem>
              <Link to="#">Blog</Link>
            </MenuItem>
            <MenuItem>
              <Link to="#">Contact</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/login">Signin</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/register">Signup</Link>
            </MenuItem>
          </ListMenu>
        </Box>
      </Container>
    </AppBar>
  );
}
