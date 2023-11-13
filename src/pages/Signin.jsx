import { Box, Stack } from "@mui/material";
import SigninForm from "../components/common/ٍSigninForm";
import img from "../assets/images/i2.jpg";

const Signin = () => {
  return (
    <Stack direction="row" className="signup-page">
      <SigninForm />
      <Box sx={{ width: "60%" }} className="img-container-signup-page">
        <img src={img} style={{ width: "100%" }} />
      </Box>
    </Stack>
  );
};

export default Signin;
