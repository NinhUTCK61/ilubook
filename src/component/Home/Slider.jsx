import React from "react";
import "./home.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Button, Container } from "@mui/material";

const slideImages = ["assets/img/slider-1.webp", "assets/img/slider-2.webp"];

export default function Slider() {
  return (
    <div>
      <Slide easing="ease">
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[0]})`,
              width: "100%",
              display: "block",
            }}
          >
            <Container sx={{ height: "100%", color: "#fff" }}>
              <div className="title-slider">
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      letterSpacing: "3px",
                      marginBottom: "5px",
                    }}
                  >
                    Beads
                  </div>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "300",
                      marginBottom: "35px",
                    }}
                  >
                    We have a wide range of beads from hair beads, necklaces,
                    bracelets etc
                  </p>
                  <div style={{ display: "flex" }}>
                    <Button
                      size="large"
                      sx={{
                        marginRight: "3%",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: 600,
                        padding: "10px 47px ",
                        borderRadius: "10px",
                        cursor: "pointer",
                        border: "1px solid #fff",
                      }}
                    >
                      Buy Now
                    </Button>
                    <Button
                      size="large"
                      variant="contained"
                      sx={{
                        background: "#fff",
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: 600,
                        padding: "10px 47px ",
                        borderRadius: "10px",
                        cursor: "pointer",
                        "&:hover": {
                          background: "#fff",
                        },
                      }}
                    >
                      INQUIRE
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    paddingTop: "20px",
                    width: "130px",
                    height: "130px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "50%",
                    backgroundColor: "#f51167",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "5px",
                      letterSpacing: "3px",
                    }}
                  >
                    from
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "30px",
                      fontWeight: 600,
                      lineHeight: "1.2",
                    }}
                  >
                    $50.00
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    SHOP NOW
                  </p>
                </div>
              </div>
            </Container>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[0]})`,
              width: "100%",
              display: "block",
            }}
          >
            <Container sx={{ height: "100%", color: "#fff" }}>
              <div className="title-slider">
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      letterSpacing: "3px",
                      marginBottom: "5px",
                    }}
                  >
                    Event planning and Management
                  </div>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "300",
                      marginBottom: "35px",
                    }}
                  >
                    We do event planning management for all different types of
                    events from <br /> weddings, birthdays ,coopera...
                  </p>
                  <div style={{ display: "flex" }}>
                    <Button
                      size="large"
                      sx={{
                        marginRight: "3%",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: 600,
                        padding: "10px 47px ",
                        borderRadius: "10px",
                        cursor: "pointer",
                        border: "1px solid #fff",
                      }}
                    >
                      Buy Now
                    </Button>
                    <Button
                      size="large"
                      variant="contained"
                      sx={{
                        background: "#fff",
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: 600,
                        padding: "10px 47px ",
                        borderRadius: "10px",
                        cursor: "pointer",
                        "&:hover": {
                          background: "#fff",
                        },
                      }}
                    >
                      INQUIRE
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    paddingTop: "20px",
                    width: "130px",
                    height: "130px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "50%",
                    backgroundColor: "#f51167",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "5px",
                      letterSpacing: "3px",
                    }}
                  >
                    from
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "30px",
                      fontWeight: 600,
                      lineHeight: "1.2",
                    }}
                  >
                    $00.50
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    SHOP NOW
                  </p>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Slide>
    </div>
  );
}
