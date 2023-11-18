import { Avatar, Button, Typography } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeLeftSide = () => {
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  return (
    <Box className="left-side-home-page">
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          paddingBottom: "20px",
          background: theme.palette.background.paper,
          borderRadius: "20px",
        }}
      >
        <Stack>
          <img className="img-cover" src={user?.profileImgUrl}></img>
          <Stack direction="row" position="relative">
            <Avatar className="img-profile" src={user?.profileImgUrl}></Avatar>
            <Typography
              variant="subtitle1"
              sx={{ m: "10px", marginLeft: "110px" }}
            >
              {user?.name}
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ paddingY: "20px" }}>
          <Stack direction="row" gap="10px">
            <Typography sx={{ color: "text.secondary" }}>
              {user?.email}
            </Typography>
          </Stack>
          <Stack direction="row" gap="10px">
            <Typography>followers </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {user?.followers.length}
            </Typography>
          </Stack>
          <Stack direction="row" gap="10px">
            <Typography>following </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {user?.following.length}
            </Typography>
          </Stack>
        </Stack>
        <Button component={Link}  to={user ? `users/${user._id}` : `signin`} fullWidth variant="contained" sx={{borderRadius:"20px"}}>Profile</Button>
      </Box>
    </Box>
  );
};

export default HomeLeftSide;
