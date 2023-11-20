import React, { useEffect, useState } from "react";
import MainContainer from "../components/common/MainContainer";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
  const isSmallScreen = useMediaQuery("(max-width:900px)");

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
      <>
        <Stack direction="row" sx={{ width: "100%", justifyContent: "center" }}>
          {/* {!isSmallScreen && <ProfileLeftSide />} */}
          <MainProfile data={data} />
          {!isSmallScreen && <ProfileRightSide />}
        </Stack>
      </>
    </>
  );
};

export default Profile;
