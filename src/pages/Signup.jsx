import { Box, Stack } from "@mui/material";
import React from "react";
import SignupForm from "../components/common/SignupForm";
import img from "../assets/images/i1.jpg";

const Signup = () => {
  return (
    <Stack direction="row" className="signup-page">
      <SignupForm />
      <Box className="img-container-signup-page">
        <img src={img} />
      </Box>
    </Stack>
  );
};

export default Signup;
