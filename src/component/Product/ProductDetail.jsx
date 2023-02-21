import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Grid, styled, Typography } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ImageZoom from "./ImageZoom";

const ListColor = styled("div")`
  display: flex;
  gap: 10px;
`;

const ColorItem = styled("p")`
  font-size: 12px;
  border: 2px solid #414141;
  width: 50px;
  height: 33px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:first-child": {
    borderTop: "2px solid #e1e1e1",
  },
  borderBottom: "2px solid #e1e1e1",
}));

const AccordionSummary = styled(props => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", fontWeight: 700 }} />
    }
    {...props}
  />
))(({ theme }) => ({
  paddingLeft: 0,
  height: "70px",
  background: "transparent",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SelectImage = styled("div")`
  margin-top: 35px;
  display: flex;
  gap: 28px;
  width: 100%;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: #afafaf;
    border-radius: 10px;
  }
`;

const ImageSelectItem = styled("img")`
  width: 116px;
  height: 116px;
  objectfit: cover;
  border: 2px solid #f51167;
`;

export default function ProductDetail() {
  const params = useParams();

  const [proDetail, setProDetail] = useState({});
  const [expanded, setExpanded] = React.useState("");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(() => {
    setProDetail({
      categori_id: 1,
      img: "https://seamaf.com/storage/products/499/eQqZiANJINCKug.jpg",
      name: "ZEBRA CHARMS (EACH)",
      price: "0.10",
      description:
        "Charms and pendants allow you to make unique jewelry designs and really express yourself! Whether you're filling up a charm bracelet, making a pair of simple earrings, dangling a single charm or pendant from a necklace, adding visual interest to your scrap booking, or working up some other fun magic, you'll discover a treasure of quality charms",
    });
  }, [params]);

  return (
    <Container sx={{ paddingTop: "20px", paddingBottom: "65px" }}>
      <p
        style={{
          paddingBottom: "50px",
          fontSize: "12px",
          color: "#414141",
          cursor: "pointer",
        }}
      >
        {"<< Back to Categories"}
      </p>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={6}>
          <ImageZoom src={proDetail.img} />
          <SelectImage>
            <ImageSelectItem
              src={"https://seamaf.com/storage/products/77/KnKUlG3u295gpz.jpg"}
            />
            <ImageSelectItem
              src={"https://seamaf.com/storage/products/77/KnKUlG3u295gpz.jpg"}
            />
            <ImageSelectItem
              src={"https://seamaf.com/storage/products/77/KnKUlG3u295gpz.jpg"}
            />
            <ImageSelectItem
              src={"https://seamaf.com/storage/products/77/KnKUlG3u295gpz.jpg"}
            />
            <ImageSelectItem
              src={"https://seamaf.com/storage/products/77/KnKUlG3u295gpz.jpg"}
            />
            <ImageSelectItem
              src={"https://seamaf.com/storage/products/77/KnKUlG3u295gpz.jpg"}
            />
          </SelectImage>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <div
            style={{
              fontSize: "18px",
              color: "#414141",
              fontWeight: "700",
              marginBottom: "18px",
            }}
          >
            {proDetail.name}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#414141",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            $ {proDetail.price}
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "#000",
              fontWeight: 700,
              color: "#414141",
              marginBottom: "10px",
            }}
          >
            Availability: <span style={{ color: "#f51167" }}>In Stock</span>
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                marginRight: "38px",
                fontSize: "14px",
                color: "#414141",
                fontWeight: 700,
              }}
            >
              COLOR
            </span>
            <ListColor>
              <ColorItem>Green</ColorItem>
              <ColorItem>Blue</ColorItem>
              <ColorItem>Purple</ColorItem>
              <ColorItem>Pink</ColorItem>
            </ListColor>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <p
              style={{
                marginRight: "38px",
                fontSize: "14px",
                color: "#414141",
                fontWeight: 700,
              }}
            >
              QUANTITY
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "54px",
                height: "36px",
                border: "1px solid #ddd",
                padding: "0 15px",
                borderRadius: "40px",
                cursor: "pointer",
              }}
            >
              <span>-</span>
              <span>5</span>
              <span>+</span>
            </div>
          </div>
          <Button
            sx={{
              backgroundColor: "#f51167",
              color: "white",
              minWidth: "190px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              padding: "10px 0",
              "&:hover": { backgroundColor: "#f51167", color: "white" },
            }}
          >
            ADD TO CART
          </Button>
          <div style={{ marginTop: "50px" }}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 700 }}
                  variant="p"
                >
                  DESCRIPTION
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "#212529",
                    lineHeight: "1.5",
                  }}
                >
                  Check out our paracode selection for the very best in unique
                  or custom, handmade pieces from our shops.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 700 }}
                  variant="p"
                >
                  SHIPPING & RETURNS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    fontSize: "18px",
                    marginBottom: "20px",
                    fontWeight: 600,
                    color: "#11111",
                  }}
                >
                  7 Days Returns
                </div>
                <div
                  style={{
                    color: "#8f8f8f",
                    marginBottom: "25px",
                    fontSize: "14px",
                    lineHeight: 1.8,
                  }}
                >
                  Cash on Delivery Available
                  <br />
                  Home Delivery{" "}
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#f51167",
                    }}
                  >
                    3 - 4 DAYS
                  </span>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
