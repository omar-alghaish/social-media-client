import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setEmail } from "../redux/features/forgetPasswordSlice";
import { Alert, Box, Stack, TextField, Typography, Link } from "@mui/material";
import React, { useState } from "react";
import Logo from "../components/common/Logo";
import { useFormik } from "formik";
import * as Yup from "yup";
import userApi from "../api/modules/userApi";
import { useNavigate } from "react-router-dom";

const ChangeForgetPassword = () => {
  const { email } = useSelector((state) => state.forgetPassword);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const changePasswordForm = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("password required")
        .min(8, "password minum 8 charchters"),
    }),
    onSubmit: async (values) => {
      const { response, error } = await userApi.changeForgetPassword({
        ...values,
        email,
      });
      setIsLoading(false);
      if (response) {
        changePasswordForm.resetForm();
        dispatch(setEmail(""));
        navigate("/");
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Stack
      component="form"
      sx={{ alignItems: "center" }}
      onSubmit={changePasswordForm.handleSubmit}
    >
      <Stack gap="30px" sx={{ width: "500px", p: "30px", maxWidth: "100%" }}>
        <Logo />
        <Box>
          <Typography variant="" component="h2">
            Change Password
          </Typography>
          <Typography variant="body2">
            in order to protect your account, make sure your password:
          </Typography>
          <ul>
            <li>Is longer than 8 characters</li>
            <li>Does not match or significantly contain your username</li>
            <li>
              is not a member of this{" "}
              <Link href="https://en.wikipedia.org/wiki/List_of_the_most_common_passwords">
                List of common passwords
              </Link>
            </li>
            <li>Avoid Personal Information</li>
            <li>
              Passwords should include a mix of uppercase and lowercase letters,
              numbers, and special characters
            </li>
          </ul>
        </Box>
        <TextField
          type="password"
          id="newPassword"
          label="New password"
          value={changePasswordForm.values.newPassword}
          onChange={changePasswordForm.handleChange}
          helperText={
            changePasswordForm.touched.newPassword &&
            changePasswordForm.errors.newPassword
          }
          error={
            changePasswordForm.touched.newPassword &&
            changePasswordForm.errors.newPassword !== undefined
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

export default ChangeForgetPassword;
