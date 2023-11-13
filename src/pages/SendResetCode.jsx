import { Alert, Box, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import userApi from "../api/modules/userApi";

const SendResetCode = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Handle focus to the next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (index > 0 && !value) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    const { response, error } = await userApi.verfiyResetCode({
      resetCode: code,
    });
    console.log(response);
    console.log(error);
    setIsLoading(false);
    if (response) {
      navigate("/changepassword");
    }
    if (error) setErrorMessage(error.message);
  };
  return (
    <Stack
      component="form"
      sx={{ alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <Stack sx={{ width: "500px", maxWidth: "100%", p: "30px", gap: "30px" }}>
        <Typography variant="" component="h2">
          Enter verifaction code
        </Typography>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              variant="outlined"
              sx={{ width: "50px", height: "50px" }}
              type="text"
              autoFocus={index === 0}
              inputRef={(el) => (inputRefs.current[index] = el)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center" },
              }}
              value={digit}
              onInput={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </Stack>
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 2 }}
        >
          send
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

export default SendResetCode;
