import React, { useEffect } from "react";
import { Slide } from "react-slideshow-image";
import { Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Aos from "aos";
import "react-slideshow-image/dist/styles.css";
import "./home.css";
import { listHomeSlide } from "../../data";

const Price = styled("div")`
  box-sizing: border-box;
  padding-top: 20px;
  width: 130px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  background-color: #f51167;
  position: relative;

  &::after {
    top: 10px;
    border-radius: 50%;
    content: "";
    width: 110px;
    height: 110px;
    position: absolute;
    border: 1px solid #f96790;
  }
`;

export default function Slider() {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <div>
      <Slide easing="ease">
        {listHomeSlide?.map(e => (
          <div className="each-slide" key={e.key}>
            <div
              style={{
                backgroundImage: `url(${e.background})`,
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
                      data-aos="fade-up"
                    >
                      {e.title}
                    </div>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "300",
                        marginBottom: "35px",
                      }}
                      data-aos="fade-up"
                      data-aos-duration="800"
                      dangerouslySetInnerHTML={{ __html: e.description }}
                    ></p>
                    <div
                      style={{ display: "flex" }}
                      data-aos="fade-up"
                      data-aos-duration="1100"
                    >
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
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Price data-aos="flip-right" data-aos-duration="1500">
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
                        ${e.price}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 400,
                          fontSize: "14px",
                          marginTop: "4px",
                        }}
                      >
                        SHOP NOW
                      </p>
                    </Price>
                    <div style={{ marginTop: "80px" }}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "24px",
                          marginRight: "41px",
                        }}
                      >
                        {e.index}
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: 400,
                          marginRight: "41px",
                        }}
                      >
                        /
                      </span>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "24px",
                        }}
                      >
                        {listHomeSlide.length}
                      </span>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
