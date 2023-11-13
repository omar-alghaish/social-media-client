import { Stack, Container } from "@mui/material";
import React from "react";

const MainContainer = ({ children, className }) => {
  return (
    <Container
      className={`${className} main-container`}
      sx={{ width: "700px", pt: "20px", pb: "20px", left: 0 }}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
