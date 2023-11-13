import { Avatar, Button, IconButton, Modal, Stack, TextField } from "@mui/material";
import React from "react";
import img from "../../assets/images/i.jpg";
import { useTheme } from "@emotion/react";
import { setCreatePostOpen } from "../../redux/features/creatPostModalSlice";
import { useDispatch, useSelector } from "react-redux";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CreateIcon from '@mui/icons-material/Create';
const InitPost = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleClick = () => {
    dispatch(setCreatePostOpen(true));
  };

  return (
    <Stack
      sx={{
        // marginTop:"50px",
        p: "10px",
        padding: "20px",
        // borderRadius: "10px",
        background:theme.palette.background.paper,
        gap: "15px",
      }}
      onClick={handleClick}
    >
      <Stack direction="row" gap="10px" sx={{ alignItems: "center" }}>
        <Avatar src={user?.profileImgUrl} />
        <TextField value="" type="text" placeholder="What is happening?" fullWidth />
      </Stack>
      {/* <Stack direction="row" gap="10px">
        <IconButton sx={{ flexGrow: 1, borderRadius: "20px" }} variant="contained">
          <InsertPhotoIcon />
        </IconButton>
        <IconButton sx={{ flexGrow: 1, borderRadius: "20px" }} variant="contained">
          <SlideshowIcon />
        </IconButton>
        <IconButton sx={{ flexGrow: 1, borderRadius: "20px" }} variant="contained">
          <CreateIcon />
        </IconButton>
        <IconButton sx={{ flexGrow: 1, borderRadius: "20px" }} variant="contained">
          <MusicNoteIcon />
        </IconButton>
      </Stack> */}
    </Stack>
  );
};

export default InitPost;
