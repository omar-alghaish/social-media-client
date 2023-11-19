import { Avatar, Button, Typography } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeLeftSide = () => {
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  return (
    <Stack className="left-side-home-page" gap="10px" >
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
              textTransform="uppercase"
              variant="subtitle1"
              sx={{ m: "10px", marginLeft: "110px" }}
            >
              {user?.name}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{ paddingY: "20px", justifyContent: "space-between" }}
          direction="row"
        >
          <Button direction="row" gap="10px">
            <Typography>followers </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {user?.followers.length}
            </Typography>
          </Button>
          <Button direction="row" gap="10px">
            <Typography>following </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {user?.following.length}
            </Typography>
          </Button>
        </Stack>
        <Button
          component={Link}
          to={user ? `users/${user._id}` : `signin`}
          fullWidth
          variant="contained"
          sx={{ borderRadius: "20px" }}
        >
          Profile
        </Button>
      </Box>
      <Box
        className="friends-recommend"
        sx={{
          background: theme.palette.background.paper,
        }}
      >
        <Typography textTransform="uppercase" sx={{ padding: "10px" }}>
          Suggust for you
        </Typography>

        <Stack gap="10px">
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: "10px" }}>
              <Avatar></Avatar>
              <Typography>{user?.name}</Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
              }}
            >
              Follow
            </Button>
          </Stack>

          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: "10px" }}>
              <Avatar></Avatar>
              <Typography>{user?.name}</Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
              }}
            >
              Follow
            </Button>
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: "10px" }}>
              <Avatar></Avatar>
              <Typography>{user?.name}</Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
              }}
            >
              Follow
            </Button>
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: "10px" }}>
              <Avatar></Avatar>
              <Typography>{user?.name}</Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
              }}
            >
              Follow
            </Button>
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: "10px" }}>
              <Avatar></Avatar>
              <Typography>{user?.name}</Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
              }}
            >
              Follow
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default HomeLeftSide;
