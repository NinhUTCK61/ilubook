import React from "react";
import "./home.css";
import { Container } from "@mui/material";
import { Button } from "@mui/material";

export default function Feedback() {
  return (
    <Container sx={{ display: { marginTop: "5%" } }}>
      <div
        className="feedback"
        style={{ backgroundImage: "url(assets/img/feedback.jpg.jpg.webp)" }}
      >
        <div className="title-feedback">
          <div style={{ color: "#fff", fontSize: "24px" }}>BEADING TOOLS</div>
          <div style={{ color: "#fff", fontSize: "18px" }}>3% DISCOUNT</div>
          <Button
            variant="contained"
            sx={{ display: { width: "15%", background: "#f51167" } }}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </Container>
  );
}
