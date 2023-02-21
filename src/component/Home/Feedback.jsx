import React from "react";
import "./home.css";
import { Container } from "@mui/material";
import { Button } from "@mui/material";

export default function Feedback() {
  return (
    <Container sx={{ display: { marginTop: "5%" } }}>
      <div
        className="feedback"
        style={{
          backgroundImage: "url(assets/img/feedback.jpg.jpg.webp)",
          position: "relative",
        }}
      >
        <div className="title-feedback">
          <div
            style={{
              color: "#fff",
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            BEADING TOOLS
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "5px",
              lineHeight: 1.5,
            }}
          >
            3% DISCOUNT
          </div>
          <Button
            variant="contained"
            sx={{
              display: { width: "15%", background: "#f51167" },
              borderRadius: "10px",
              padding: "10px 30px",
              cursor: "pointer",
            }}
          >
            Shop Now
          </Button>
        </div>
        <div
          style={{
            position: "absolute",
            right: "30px",
            top: "20px",
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
      </div>
    </Container>
  );
}
