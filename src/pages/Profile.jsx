import React, { useEffect, useState } from "react";
import { Stack, useMediaQuery } from "@mui/material";

import { useParams } from "react-router-dom";
import userApi from "../api/modules/userApi";
import postApi from "../api/modules/postApi";
import { useSelector } from "react-redux";
import MainProfile from "../components/common/MainProfile";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [isFollow, setIsFollow] = useState();
  const [isFriendRequest, setIsFriendRequest] = useState();
  const [posts, setPosts] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width:900px)");

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
          {/* {!isSmallScreen && <ProfileRightSide />} */}
        </Stack>
      </>
    </>
  );
};

export default Profile;
