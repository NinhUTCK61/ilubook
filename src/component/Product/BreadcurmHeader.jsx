import React from "react";
import { Container, Typography, Box } from "@mui/material";

const BreadcurmHeader = () => {
  return (
    <Box
      sx={{
        background: "#f8f7f7",
        padding: "20px 0 10px",
      }}
    >
      <Container>
        <Typography
          variant="p"
          sx={{
            color: "#414141",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "24px",
            lineHeight: "1.2",
          }}
        >
          BEADING WIRES AND THREADS
        </Typography>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#414141" }}>
          Home / Shop
        </div>
      </Container>
    </Box>
  );
};

export default BreadcurmHeader;
