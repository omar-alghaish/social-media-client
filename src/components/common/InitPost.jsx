import { Avatar, Stack, TextField } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import { setCreatePostOpen } from "../../redux/features/creatPostModalSlice";
import { useDispatch, useSelector } from "react-redux";

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
        p: "10px",
        padding: "20px",
        background: theme.palette.background.paper,
        gap: "15px",
      }}
      onClick={handleClick}
    >
      <Stack direction="row" gap="10px" sx={{ alignItems: "center" }}>
        <Avatar src={user?.profileImgUrl} />
        <TextField
          value=""
          type="text"
          placeholder="What is happening?"
          fullWidth
        />
      </Stack>
    </Stack>
  );
};

export default InitPost;
