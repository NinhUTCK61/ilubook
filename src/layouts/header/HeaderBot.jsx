import React from "react";
import { AppBar, Container } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "./header.css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

const ListMenu = styled("ul")`
  display: flex;
  justifycontent: flex-start;
  list-style-type: none;
  padding: 0;
`;

const MenuItem = styled("li")`
  padding: 0 17px;
  &:first-child {
    paddingleft: 0px;
    paddingright: 17px;
  }
  & > a {
    color: #fff;
    text-decoration: none;
    fontsize: 16px;
  }

  &:hover a {
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
            </MenuItem>
            <MenuItem>
              <Link to="#">On Sale</Link>
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
