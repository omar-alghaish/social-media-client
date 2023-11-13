import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setEmail } from "../redux/features/forgetPasswordSlice";
import { Alert, Box, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Logo from "../components/common/Logo";
import { useFormik } from "formik";
import * as Yup from "yup";
import userApi from "../api/modules/userApi";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const forgetPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("email is required"),
    }),
    onSubmit: async (values) => {
      const { response, error } = await userApi.forgetPassword(values);
      setIsLoading(false);
      if (response) {
        forgetPasswordForm.resetForm();
        dispatch(setEmail(values.email));
        navigate("/resetcode");
      }
      if (error) setErrorMessage(error.message);
    },
  });
  return (
    <Stack
      component="form"
      sx={{ alignItems: "center" }}
      onSubmit={forgetPasswordForm.handleSubmit}
    >
      <Stack gap="30px" sx={{ width: "500px", p: "30px", maxWidth: "100%" }}>
        <Logo />
        <Box>
          <Typography variant="" component="h2">
            Find your 3rabia account
          </Typography>
          <Typography variant="body2">
            Enter the email associated with your account to change your
            password.
          </Typography>
        </Box>
        <TextField
          type="email"
          id="email"
          label="email"
          value={forgetPasswordForm.values.email}
          onChange={forgetPasswordForm.handleChange}
          helperText={
            forgetPasswordForm.touched.email && forgetPasswordForm.errors.email
          }
          error={
            forgetPasswordForm.touched.email &&
            forgetPasswordForm.errors.email !== undefined
          }
        />
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 2 }}
          loading={isLoading}
        >
          Next
        </LoadingButton>
        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default ForgetPassword;
