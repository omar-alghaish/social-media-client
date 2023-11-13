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
import ImagePlaceHolder from "./ImagePlaceHolder";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      about: "",
      profileImg: null,
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      email: Yup.string().email().required("email is required"),
      about: Yup.string().max(240, "bio must be at most 100 characters"),
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

      const { response, error } = await userApi.signUp(values);
      console.log(response);
      console.log(error);
      setIsLoading(false);
      if (response) {
        signupForm.resetForm();
        dispatch(setUser(response));
        navigate(`/users/${response.data._id}`);
      }
      if (error) setErrorMessage(error.message);
    },
  });
  const remainingCharacters = 240 - signupForm.values.about.length;

  return (
    <Stack
      className="signup-form"
      component="form"
      enctype="multipart/form-data"
      onSubmit={signupForm.handleSubmit}
    >
      <Stack
        direction="row"
        sx={{ p: "20px 0", justifyContent: "space-between" }}
      >
        <Box>
          <Logo />
          <Typography component="h2" variant="">
            Create account
          </Typography>
        </Box>
        <ImagePlaceHolder form={signupForm} />
      </Stack>
      <Stack spacing={2} direction="column">
        <TextField
          type="text"
          id="name"
          label="name"
          value={signupForm.values.name}
          onChange={signupForm.handleChange}
          error={
            signupForm.touched.name && signupForm.errors.name !== undefined
          }
          helperText={signupForm.touched.name && signupForm.errors.name}
        />
        <TextField
          type="email"
          id="email"
          label="email"
          value={signupForm.values.email}
          onChange={signupForm.handleChange}
          helperText={signupForm.touched.email && signupForm.errors.email}
          error={
            signupForm.touched.email && signupForm.errors.email !== undefined
          }
        />
        <TextField
          type="text"
          id="phone"
          label="phone"
          value={signupForm.values.phone}
          onChange={signupForm.handleChange}
          helperText={signupForm.touched.phone && signupForm.errors.phone}
          error={
            signupForm.touched.phone && signupForm.errors.phone !== undefined
          }
        />
        <TextField
          type="text"
          id="about"
          multiline
          label="about"
          value={signupForm.values.about}
          onChange={signupForm.handleChange}
          helperText={`${remainingCharacters}/240`}
          error={remainingCharacters < 0 ? `${remainingCharacters}/240` : false}
        />
        <TextField
          type="password"
          id="password"
          label="password"
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          helperText={signupForm.touched.password && signupForm.errors.password}
          error={
            signupForm.touched.password &&
            signupForm.errors.password !== undefined
          }
        />
        <TextField
          type="password"
          id="passwordConfirm"
          label="confirm password"
          value={signupForm.values.passwordConfirm}
          onChange={signupForm.handleChange}
          helperText={
            signupForm.touched.passwordConfirm &&
            signupForm.errors.passwordConfirm
          }
          error={
            signupForm.touched.passwordConfirm &&
            signupForm.errors.passwordConfirm !== undefined
          }
        />
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoading}
          background="blue"
        >
          sign up
        </LoadingButton>
      </Stack>
      <Stack direction="row" sx={{ alignItems: "center", marginTop: 2 }}>
        already have account
        <Button component={Link} to="/signin">
          sign in
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

export default SignupForm;
