import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  Box,
  Stack,
  Avatar,
  Container,
  useTheme,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import uiConfigs from "../../configs/ui.configs";
import { useParams } from "react-router-dom";
import userApi from "../../api/modules/userApi";

const MainProfile = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const [active, setActive] = useState("postes");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [isFollow, setIsFollow] = useState();
  const [isFriendRequest, setIsFriendRequest] = useState();

  const handleActive = (e) => {
    setActive(e.target.value);
  };

  const handleAddFriend = async () => {
    const { respond, error } = await userApi.addFriend({ id });
    setIsFriendRequest(!isFriendRequest);
  };

  const handleFollow = async () => {
    const { respond, error } = await userApi.follow({ id });
    setIsFollow(!isFollow);
  };
  //

  const theme = useTheme();
  const { themeMode } = useSelector((state) => state.themeMode);
  return (
    <Box>
      <Box
        className="info-part"
        sx={{
          width: "600px",
          maxWidth: "100%",
          height: "400px",
          background: `url(${data.profileImgUrl})`,
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <Box
          className="background-liener"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            background:
              themeMode === "dark"
                ? `linear-gradient(to top, rgba(0,0,0,.9) 40%,rgba(0,0,0,0))`
                : `linear-gradient(to top, rgba(255,255,255) 40%,rgba(25,25,1,0))`,
          }}
        />
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              border: `3px solid ${theme.palette.secondary.main}`,
              borderRadius: "100%",
              zIndex: "1",
            }}
          >
            <Avatar
              src={data.profileImgUrl}
              sx={{
                width: "100px",
                height: "100px",
                border: "3px solid transparent",
              }}
            />
          </Box>
          <Stack sx={{ zIndex: "1", textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{ fontSize: "25px", fontWeight: "bold" }}
            >
              {data.name}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {data.slug}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              height: "50px",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
            position="relative"
          >
            <Box>
              <Typography component="h4" variant="">
                {data?.followers?.length}
              </Typography>
              <Typography variant="body2">Followers</Typography>
            </Box>
            <Divider orientation="vertical" />
            <Box>
              <Typography component="h4" variant="">
                {data?.following?.length}
              </Typography>
              <Typography variant="body2">Following</Typography>
            </Box>
            <Divider orientation="vertical" />

            <Box>
              <Typography component="h4" variant="">
                {data?.friends?.length}
              </Typography>
              <Typography variant="body2">Friends</Typography>
            </Box>
          </Stack>
          <Stack sx={{ zIndex: "1", mt:"50px" }}>
            {user._id === id ? (
              <Button
                sx={{
                  borderRadius: "20px",
                }}
                variant="outlined"
              >
                Edit profile
              </Button>
            ) : (
              <Stack direction="row" sx={{ gap: "10px" }}>
                <Button
                  startIcon={<CheckCircleOutlineIcon />}
                  sx={{
                    // background: "white",
                    // color: "black",
                    borderRadius: "20px",
                  }}
                  variant="contained"
                  onClick={handleFollow}
                >
                  {data?.followers?.includes(user._id) ? "unFollow" : "follow"}
                </Button>
                <Button
                  startIcon={<PersonAddAltIcon />}
                  sx={{
                    flexGrow: 1,
                    // background: "rgb(255,255,255,.3)",
                    // color: "white",
                    borderRadius: "20px",
                  }}
                  onClick={handleAddFriend}
                  variant="outlined"
                >
                  {data?.friendsRequest?.includes(user._id)
                    ? "request sent"
                    : data?.friends?.includes(user._id)
                    ? "unfriend"
                    : "add friend"}
                </Button>
                <Button
                  sx={{
                    // background: "rgb(255,255,255,.3)",
                    // color: "white",
                    borderRadius: "20px",
                  }}
                  variant="outlined"
                >
                  ...
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default MainProfile;
