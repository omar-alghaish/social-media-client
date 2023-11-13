import React, { useEffect, useState } from "react";
import {
  AppBar,
  Divider,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSocketIo from "../../hooks/useSocketio";
import { setSideBarOpen } from "../../redux/features/sideBar";

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

const BottomBar = () => {
  const { user } = useSelector((state) => state.user);

  const { themeMode } = useSelector((state) => state.themeMode);
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setSideBarOpen(true));
  };

  const [notificationsLength, setNotificationsLength] = useState(0);
  const { socket } = useSocketIo();
  const id = user?._id;
  useEffect(() => {
    let timer;
    socket?.on("connect", () => {
      socket.emit("setUserId", id);
      socket.emit("getNotificationsLength", id);
      socket?.on("notificationsLength", (data) => {
        setNotificationsLength(data);
      });
      timer = setTimeout(() => {
        socket.emit("getNotificationsLength", id);
      }, 2000);
      socket?.on("disconnect", () => {});
    });

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.off("notifications");
      clearTimeout(timer);
    };
  }, [id, socket]);

  return (
    <HideOnScroll>
      <AppBar
        sx={{
          boxShadow: 0,
          top: "auto",
          bottom: 0,
          background: theme.palette.background.default,
        }}
      >
        <Divider />
        <Toolbar>
          <Stack direction="row" spacing={2} className="bottombar">
            <IconButton component={Link} to="/">
              <HomeOutlinedIcon />
            </IconButton>
            <IconButton component={Link} to="/search">
              <SearchIcon />
            </IconButton>
            <IconButton
              sx={{ position: "relative" }}
              component={Link}
              to="/notifications"
            >
              <NotificationsIcon />
              {notificationsLength > 0 ? (
                <Typography
                  sx={{
                    position: "absolute",
                    top: "0px",
                    right: "-10px",
                    background: theme.palette.primary.contrastText,
                    padding: "2px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  color={theme.palette.primary.light}
                >
                  {notificationsLength}
                </Typography>
              ) : (
                false
              )}
            </IconButton>

            <IconButton component={Link} to="/reals">
              <SlideshowIcon />
            </IconButton>
            <IconButton onClick={handleClick}>
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default BottomBar;
