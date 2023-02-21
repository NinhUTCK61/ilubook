import React from "react";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import "./home.css";

export default function Banner() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { height: "205px", marginTop: "5%" },
            position: "relative",
          }}
        >
          <div
            className="component-banner-left"
            style={{
              backgroundImage:
                "url(assets/img/jellyfish-698521_1280.jpg.jpg.webp)",
              backgroundSize: "cover",
              backgroundPosition: "top center",
              width: "100%",
              height: "100%",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "5%",
              }}
            >
              <div
                className=""
                style={{
                  fontSize: "24px",
                  color: "#fff",
                  lineHeight: 1.2,
                  fontWeight: 600,
                }}
              >
                HANDMADE
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#fff",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  marginBottom: "5px",
                  lineHeight: "1.5",
                }}
              >
                HURRY! 60% OFF!
              </div>
              <Button
                variant="contained"
                sx={{
                  display: {
                    width: "30%",
                    background: "#f51167",
                    fontWeight: 600,
                    borderRadius: "10px",
                    minWidth: "167px",
                    padding: "10px 0",
                    "&:hover": {
                      background: "#f51167",
                    },
                  },
                }}
              >
                Shop Now
              </Button>
            </div>
          </div>
          {/* SALE */}
          <div
            style={{
              position: "absolute",
              right: "30px",
              top: "50px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#fff",
              borderRadius: "2px",
              backgroundColor: "#f51167",
              padding: "4px 10px",
            }}
          >
            SALE
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { height: "205px", marginTop: "5%" },
            position: "relative",
          }}
        >
          <div
            className="component-banner-right"
            style={{
              backgroundImage:
                "url(assets/img/milky-way-2695569_1280.jpg.jpg.webp)",
              backgroundSize: "cover",
              backgroundPosition: "top center",
              width: "100%",
              height: "100%",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "5%",
              }}
            >
              <div
                className=""
                style={{
                  fontSize: "24px",
                  color: "#fff",
                  lineHeight: 1.2,
                  fontWeight: 600,
                }}
              >
                EVENTS
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#fff",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  marginBottom: "5px",
                  lineHeight: "1.5",
                }}
              >
                WEDDING & PARTY ACCESSORIES
              </div>
              <Button
                variant="contained"
                sx={{
                  display: {
                    width: "30%",
                    background: "#f51167",
                    fontWeight: 600,
                    borderRadius: "10px",
                    minWidth: "167px",
                    padding: "10px 0",
                    "&:hover": {
                      background: "#f51167",
                    },
                  },
                }}
              >
                Shop Now
              </Button>
            </div>
          </div>
          {/* NEW */}
          <div
            style={{
              position: "absolute",
              right: "30px",
              top: "50px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#fff",
              borderRadius: "2px",
              backgroundColor: "#50e550",
              padding: "4px 10px",
            }}
          >
            NEW
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
