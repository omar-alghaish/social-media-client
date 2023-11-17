import { Avatar, Typography } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

const HomeLeftSide = () => {
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  return (
    <Box className="left-side-home-page">
      <Box
        sx={{
          width: "100%",
          height: "300px",
          // background: "black",
          borderRadius: "20px",
        }}
      >
        <Stack>
          <img className="img-cover" src={user.profileImgUrl}></img>
          <Stack direction="row">
            <Avatar className="img-profile" src={user.profileImgUrl}></Avatar>
            <Typography>omar alghaish</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomeLeftSide;
