import { Stack, Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const MainContainer = ({ children, className }) => {
  return (
    <Stack
      className={`${className} main-container`}
      sx={{ pt: "20px", pb: "20px", left: 0 }}
    >
      {children}
    </Stack>
  );
};

export default MainContainer;
