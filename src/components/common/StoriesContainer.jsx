import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { Avatar, Typography } from "@mui/material";
import storyApi from "../../api/modules/storyApi";
import { useDispatch } from "react-redux";
import { setStoryViewer } from "../../redux/features/createStoryModalSlice";
const StoriesContainer = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getStories = async () => {
      const { response, error } = await storyApi.getFriendsStories();
      setData(response.data);
    };
    getStories();
  }, []);

  const handleClick = () => {
    dispatch(setStoryViewer(true));
    console.log(true)
  };

  return (
    <Box>
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        className="stories-container"
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard, Pagination, Navigation]}
      >
        {data?.map((story) => (
          <SwiperSlide
            className="story-slide-swiper"
            key={story._id}
            onClick={handleClick}
          >
            {story?.stories[0].media[0].mimetype.startsWith("video") ? (
              <video
                src={story.stories[0].media[0].path}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : story?.stories[0].media[0].mimetype.startsWith("image") ? (
              <img
                src={story.stories[0].media[0].path}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}

            <Stack direction="row" className="story-user-profile">
              <Avatar src={story.profileImgUrl} />
              <Stack>
                <Typography color="white" variant="body2">
                  {story.name}
                </Typography>
                <Typography color="white" fontSize="10px">
                  3min
                </Typography>
              </Stack>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default StoriesContainer;
