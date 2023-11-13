import React, { cloneElement, useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../../redux/features/themeSlice";
import { themeModes } from "../../configs/themeConfigs";
import useSocketIo from "../../hooks/useSocketio";
import { setSideBarOpen } from "../../redux/features/sideBar";
import Logo from "./Logo";

const HideOnScroll = ({ children, window }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 50,
  });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
};

const HideOnScrollDown = ({ children, window }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 50,
  });

  return (
    <Slide appear={false} direction="dwon" in={!trigger}>
      {children}
    </Slide>
  );
};

const BottomBar = () => {
  const { user } = useSelector((state) => state.user);

  const { themeMode } = useSelector((state) => state.themeMode);
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <HideOnScrollDown>
      <AppBar
        sx={{
          boxShadow: 0,
          top: "0",
          background: theme.palette.background.default,
        }}
      >
        <Toolbar>
          <Stack
            direction="row"
            spacing={2}
            className="bottombar"
            justifyContent="flex-end"
          >
            <Logo />
            <TextField
              sx={{ flexGrow: 1 }}
              size="small"
              component={Link}
              to="/search"
              InputProps={{
                endAdornment: (
                  <IconButton
                    type="submit"
                    size="small"
                    variant="contained"
                    // loading={isLoading}
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            ></TextField>
            <IconButton
              component={Link}
              to={user ? `users/${user._id}` : `signin`}
            >
              <Avatar src={user?.profileImgUrl} />
            </IconButton>
          </Stack>
        </Toolbar>
        <Divider />
      </AppBar>
    </HideOnScrollDown>
  );
};

export default BottomBar;
