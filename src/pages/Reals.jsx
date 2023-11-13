import React from "react";
import Real from "../components/common/Real";
import { Stack } from "@mui/material";
import RealSwiper from "../components/common/RealSwiper";

const Reals = () => {
  return (
    <Stack className="reals-page">
      <RealSwiper />
    </Stack>
  );
};

export default Reals;
