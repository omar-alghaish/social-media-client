import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import audio from "../../assets/audio/1690753216217_track.mp3";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ReactPlayer from "react-player";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentsContainer from "./CommentsContainer";
import Loading from "./Loading";
import Reactions from "./Reactions";
import TextWithTags from "./TextWithTags";
import { Link } from "react-router-dom";
import ShareList from "./ShareList";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Img = React.lazy(() => import("./Img"));

const Post = ({ data, index, socket }) => {
  const [post, setPost] = useState(data);
  const [shareOpen, setShareOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const theme = useTheme()

  const handleText = (e) => {
    e.target.classList.toggle("expanded");
  };

  const handleCommentsOpen = () => {
    setCommentsOpen(!commentsOpen);
  };

 const handleShareOpen = ()=>{
  setShareOpen(!shareOpen)
  }

  return (
    <Stack gap="10px" className="post" sx={{background: theme.palette.background.paper}} >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" ,paddingX:"20px"}}
      >
        <Stack
          component={Link}
          to={`/users/${post.user}`}
          gap="10px"
          direction="row"
          sx={{ alignItems: "center" }}
        >
          <Avatar src={post?.userProfile} />
          <Typography color="text.primary">{post?.userName}</Typography>
        </Stack>
        <Stack direction="row" sx={{alignItems:"center", justifyContent:"center"}}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {dayjs(post.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </Typography>
        <IconButton onClick={handleShareOpen}>
          <MoreVertIcon />
        </IconButton> 
        </Stack>
       
      </Stack>
      <Box className="text-container">
        <Typography
          onClick={handleText}
          className="text"
          variant="body2"
          // component="h4"
          sx={{
            color: "text.main",
            whiteSpace: "pre-line",
            // direction: "rtl",
          }}
        >
          {post?.content && <TextWithTags text={post.content} />}
        </Typography>
      </Box>

      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        grabCursor={true}
        pagination={{ clickable: true }}
        // navigation={true}
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "max-content" }}
      >
        {post?.media.map((file) => (
          <SwiperSlide style={{ width: "100%" }}>
            {file.mimetype.startsWith("image") ? (
              <Suspense fallback={<Loading />}>
                <Img src={file.path} />
              </Suspense>
            ) : file.mimetype.startsWith("video") ? (
              <ReactPlayer
                url={file.path}
                controls="true"
                width="700px"
                height="400px"
                style={{
                  background: "",
                  borderRadius: "20px",
                  maxWidth: "90vw",
                }}
              />
            ) : file.mimetype.startsWith("audio") ? (
              <AudioPlayer autoPlay={false} src={audio} />
            ) : (
              false
            )}
          </SwiperSlide>
        ))}
      </Swiper>
       <Divider /> 
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
       
        <Box
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
         
          <Reactions post={post} />
        </Box>

        <Button
          sx={{ color: "text.primary" }}
          onClick={handleCommentsOpen}
          startIcon={<CommentIcon />}
        >
          comment {post.comments.length || false}
        </Button>
        <Button sx={{ color: "text.primary" }}  startIcon={<SendIcon />}>
          share
        </Button>
      </Stack>
      <ShareList shareOpen={shareOpen} handleShareOpen={handleShareOpen} data={post}/>
      {commentsOpen ? (
        <CommentsContainer comments={post.comments} post={post} />
      ) : (
        false
      )}
      {/* <Divider /> */}
    </Stack>
  );
};

export default Post;
