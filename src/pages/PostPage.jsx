import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContainer from "../components/common/MainContainer";
import Post from "../components/common/Post";
import postApi from "../api/modules/postApi";
import { Stack } from "@mui/system";
import LoadingPage from "../components/common/LoadingPage";

const PostPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      const { response, error } = await postApi.getSinglePost(id);
      setData(response.data);

      if (response || error) {
        setIsLoading(false);
      }
    };
    getPost();
  }, []);

  return (
    <MainContainer>
      <Stack sx={{ minHeight: "120vh" }}>
        {isLoading ? <LoadingPage /> : <Post data={data} />}
      </Stack>
    </MainContainer>
  );
};

export default PostPage;
