import { LoadingButton } from "@mui/lab";

import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import userApi from "../../api/modules/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const signinForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("email is required"),
      password: Yup.string()
        .required("password required")
        .min(8, "password minum 8 charchters"),
      passwordConfirm: Yup.string()
        .required("password confirm required")
        .oneOf([Yup.ref("password"), null], "passwords not matches"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoading(true);

      const { response, error } = await userApi.signin(values);
      console.log(response);
      console.log(error);
      setIsLoading(false);
      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        navigate(`/users/${response.data._id}`)
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Stack
      className="signup-form"
      component="form"
      enctype="multipart/form-data"
      onSubmit={signinForm.handleSubmit}
      // sx={{ justifyContent: "center" }}
    >
      <Stack
        direction="row"
        sx={{ p: "20px 0", justifyContent: "space-between" }}
      >
        <Box>
          <Logo />
          <Typography component="h2" variant="">
            Welcome back
          </Typography>
        </Box>
      </Stack>
      <Stack spacing={2} direction="column">
        <TextField
          type="email"
          id="email"
          label="email"
          value={signinForm.values.email}
          onChange={signinForm.handleChange}
          helperText={signinForm.touched.email && signinForm.errors.email}
          error={
            signinForm.touched.email && signinForm.errors.email !== undefined
          }
        />

        <TextField
          type="password"
          id="password"
          label="password"
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          helperText={signinForm.touched.password && signinForm.errors.password}
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
        />
        <TextField
          type="password"
          id="passwordConfirm"
          label="confirm password"
          value={signinForm.values.passwordConfirm}
          onChange={signinForm.handleChange}
          helperText={
            signinForm.touched.passwordConfirm &&
            signinForm.errors.passwordConfirm
          }
          error={
            signinForm.touched.passwordConfirm &&
            signinForm.errors.passwordConfirm !== undefined
          }
        />
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoading}
        >
          sign in
        </LoadingButton>
      </Stack>
      <Stack direction="row" sx={{ alignItems: "center", marginTop: 2 }}>
        do not have account?
        <Button component={Link} to="/signup">
          sign up
        </Button>
      </Stack>
      <Stack direction="row" >
        <Button component={Link} to="/forgetpassword">
          forget password
        </Button>
      </Stack>
      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Stack>
  );
};

export default SigninForm;
