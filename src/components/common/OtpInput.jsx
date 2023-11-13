import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <Stack direction="row">
      {otp.map((digit, index) => (
        <TextField
          key={index}
          variant="outlined"
          margin="normal"
          sx={{
            width: "50px",
            height: "50px",
          }}
          type="text"
          autoFocus={index === 0}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "1.5rem" },
          }}
          value={digit}
          id={`otp-input-${index}`}
          onInput={(e) => handleChange(index, e.target.value)}
        />
      ))}
      <button onClick={() => console.log("OTP Entered:", otp.join(""))}>
        Submit OTP
      </button>
    </Stack>
  );
};

export default OtpInput;
