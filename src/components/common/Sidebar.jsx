import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Logo from "./Logo";
import uiConfigs from "../../configs/ui.configs";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";

import { themeModes } from "../../configs/themeConfigs";
import { setThemeMode } from "../../redux/features/themeSlice";
import { useState } from "react";
import { setSideBarOpen } from "../../redux/features/sideBar";

const Sidebar = () => {
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(open)
  const { sideBarOpen } = useSelector((state) => state.sideBar);

  const handleClick = () => {
    dispatch(setSideBarOpen());
  };

  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
const theme = useTheme()

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <Box >
      <Toolbar
        sx={{ paddingY: "20px", paddingLeft: "50px", color: "text.primary" }}
      >
        <Stack width="100%" direction="row" justifyContent="">
          <Logo />
          <IconButton
            sx={{ position: "absolute", right: "0" }}
            onClick={handleClick}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {themeMode === themeModes.dark ? "dark mode" : "light mode"}
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          onClick={handleClick}
          component={Link}
          to="/friendrequests"
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">friend Requests</Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          onClick={handleClick}
          component={Link}
          to={user ? `users/${user._id}` : `signin`}
        >
          <ListItemIcon>{<Avatar src={user?.profileImgUrl} />}</ListItemIcon>
          <ListItemText>
            <Typography textTransform="uppercase">profile</Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      open={sideBarOpen}
      className="sidebar"
      sx={{
        width: 500,
        maxWidth:"100%",
        "& .MuiDrawer-paper": {
          background: theme.palette.background.default,
          width: 500,
          maxWidth:"100%",
          boxSizing: "border-box",
        },
      }}
      onClose={handleClick}
      onOpen={handleClick}
      anchor="left"
    >
      {drawer}
    </SwipeableDrawer>
  );
};

export default Sidebar;
