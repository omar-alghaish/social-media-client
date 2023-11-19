import React, { useEffect, useState } from "react";
import MainContainer from "../components/common/MainContainer";
import InitPost from "../components/common/InitPost";
import Post from "../components/common/Post";
import postApi from "../api/modules/postApi";
import { Alert, Button, Stack, useMediaQuery } from "@mui/material";
import LoadingPage from "../components/common/LoadingPage";
import HalfCircleMenue from "../components/common/HalfCircleMenue";
import { Link } from "react-router-dom";
import StoriesContainer from "../components/common/StoriesContainer";
import TobBar from "../components/common/TobBar";
import ShareList from "../components/common/ShareList";
import { Box } from "@mui/system";
import HomeLeftSide from "../components/common/HomeLeftSide";
import HomeRightSide from "../components/common/HomeRightSide";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const getPosts = async () => {
      const { response, error } = await postApi.getFriendsPosts();
      if (response) {
        setLoading(false);
        setData(response?.data);
      }

      if (error) {
        setError(error);
        setLoading(false);
      }
    };

    getPosts();
  }, []);
  return (
    <MainContainer>
      {loading ? (
        <Stack>
          <HalfCircleMenue />
          <InitPost />
          <LoadingPage />
          <LoadingPage />
          <LoadingPage />
          <LoadingPage />
          <LoadingPage />
          <LoadingPage />
          <LoadingPage />
          <LoadingPage />
          <LoadingPage />
          <LoadingPage />
        </Stack>
      ) : error ? (
        <Stack>
          {" "}
          <Alert severity="error">{error.message}</Alert>
          {error.message === "Please login again" ? (
            <Button component={Link} to="/signin">
              Login
            </Button>
          ) : (
            false
          )}
        </Stack>
      ) : (
        <Stack>
          <TobBar />
          <StoriesContainer />
          <ShareList />

          <HalfCircleMenue />
          <Stack direction="row" gap="10px">
            {!isSmallScreen && <HomeLeftSide />}

            <Box>
              <InitPost />
              {data?.map((post, index) => (
                <Post data={post} key={post?._id} />
              ))}
            </Box>
            <HomeRightSide />
          </Stack>
        </Stack>
      )}
    </MainContainer>
  );
};

export default Home;
