import React, { useEffect, useState } from "react";
import MainContainer from "../components/common/MainContainer";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Post from "../components/common/Post";
import { useParams } from "react-router-dom";
import userApi from "../api/modules/userApi";
import postApi from "../api/modules/postApi";
import { useSelector } from "react-redux";
import ProfileCard from "../components/common/ProfileCard";
import HalfCircleMenue from "../components/common/HalfCircleMenue";
import InitPost from "../components/common/InitPost";
import ProfileLeftSide from "../components/common/ProfileLeftSide";
import ProfileRightSide from "../components/common/ProfileRightSide";
import MainProfile from "../components/common/MainProfile";

const Profile = () => {
  const [active, setActive] = useState("postes");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [isFollow, setIsFollow] = useState();
  const [isFriendRequest, setIsFriendRequest] = useState();
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    const getuser = async () => {
      const { response, error } = await userApi.getUser(id);
      if (response) {
        setIsLoading(false);
      }
      setData(response?.data);
    };

    getuser();
  }, [isFollow, id, isFriendRequest]);
  useEffect(() => {
    const getPosts = async () => {
      const { response, error } = await postApi.getUserPosts(id);
      setPosts(response?.data);
    };

    getPosts();
  }, []);
  return (
    <>
    <MainContainer>
      <Stack direction="row">
  <ProfileLeftSide />
  <MainProfile data={data}/>
  <ProfileRightSide/>
</Stack>
    </MainContainer>



    
    
      {/* {isLoading ? (
        <ProfileCard />
      ) : (
        <Box gap="10px" sx={{ maxWidth: "100%",width:"100%" }}>
          <Stack
            sx={{
              gap: "20px",
              color: "white",

              position: "relative",
              background: "rgba(0,0,0,.5)",
              background: `linear-gradient(to top, rgba(0,0,0,.7) 40%,rgba(0,0,0,0))`,
            }}
            className="profileInfo"
          >
            <Box
              sx={{
                ...uiConfigs.style.horizontalGradientBgImage.dark,

                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                left: "0",
                top: "0",
                zIndex: -1,
                opacity: 0.8,
              }}
            />
            <Stack
              direction="row"
              sx={{
                zIndex: 3,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                src={data.profileImgUrl}
              ></Avatar>
              <Stack
                direction="row"
                sx={{ height: "50px", gap: "10px" }}
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
            </Stack>
            <Box>
              <Typography color="white" component="h2" variant="">
                {data?.name?.toUpperCase()}
              </Typography>
              <Typography color="white" sx={{ opacity: 0.9 }} variant="body2">
                {data?.slug}
              </Typography>
              <Typography
                className="text"
                color="text.contrast"
                sx={{ opacity: 0.9, paddingTop: "10px" }}
                variant="body2"
              >
                {data?.about}
              </Typography>
            </Box>

            {user._id === id ? (
              <Button
                sx={{
                  background: "rgb(255,255,255,.3)",
                  color: "white",
                  borderRadius: "20px",
                }}
              >
                Edit profile
              </Button>
            ) : (
              <Stack direction="row" sx={{ gap: "10px" }}>
                <Button
                  startIcon={<CheckCircleOutlineIcon />}
                  sx={{
                    background: "white",
                    color: "black",
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
                    background: "rgb(255,255,255,.3)",
                    color: "white",
                    borderRadius: "20px",
                  }}
                  onClick={handleAddFriend}
                  variant="contained"
                >
                  {data?.friendsRequest?.includes(user._id)
                    ? "request sent"
                    : data?.friends?.includes(user._id)
                    ? "unfriend"
                    : "add friend"}
                </Button>
                <Button
                  sx={{
                    background: "rgb(255,255,255,.3)",
                    color: "white",
                    borderRadius: "20px",
                  }}
                  variant="contained"
                >
                  ...
                </Button>
              </Stack>
            )}
          </Stack>
          <MainContainer>
            {user._id === id ? <InitPost /> : false}
            <Stack
              direction="row"
              gap="10px"
              sx={{
                background: "rgb(255,255,255,.1)",
                borderRadius: "20px",
                height: "40px",
              }}
            >
              <Button
                onClick={handleActive}
                value="postes"
                sx={{ borderRadius: "20px", flexGrow: 1 }}
                variant={active === "postes" ? "contained" : "text"}
              >
                postes
              </Button>
              <Button
                onClick={handleActive}
                value="reals"
                sx={{ borderRadius: "20px", flexGrow: 1 }}
                variant={active === "reals" ? "contained" : "text"}
              >
                reals
              </Button>
              <Button
                onClick={handleActive}
                value="storys"
                sx={{ borderRadius: "20px", flexGrow: 1 }}
                variant={active === "storys" ? "contained" : "text"}
              >
                storys
              </Button>
              <Button
                onClick={handleActive}
                value="groups"
                sx={{ borderRadius: "20px", flexGrow: 1 }}
                variant={active === "groups" ? "contained" : "text"}
              >
                groups
              </Button>
            </Stack>
            <Stack>
              {posts.map((post, index) => (
                <Post data={post} />
              ))}
            </Stack>
          </MainContainer>
        </Box>
      )}
      <HalfCircleMenue /> */}
    </>
  );
};

export default Profile;
