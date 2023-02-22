import React from "react";
import { AppBar, Container, keyframes } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "./header.css";
import { styled } from "@mui/material/styles";
import { listMenu } from "../../data";

const ListMenu = styled("ul")`
  display: flex;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0;
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

export default function HeaderBot() {
  const renderSubMenu = listMenu => {
    return (
      <SubMenu>
        {listMenu?.map(e => (
          <SubMenuItem key={e.key}>{e.name}</SubMenuItem>
        ))}
      </SubMenu>
    );
  };
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
                {i.subMenu.length > 0 && renderSubMenu(i.subMenu)}
              </MenuItem>
            ))}
          </ListMenu>
        </Box>
      </Container>
    </AppBar>
  );
}
