import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Slide,
  Stack,
  TextField,
  Toolbar,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "./Logo";

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

  const theme = useTheme();

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
                  <IconButton type="submit" size="small" variant="contained">
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
