import { Stack } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Stack
      sx={{
        width: "500px",
        maxWidth:"100%",
        height: "400px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading....
    </Stack>
  );
};

export default Loading;
