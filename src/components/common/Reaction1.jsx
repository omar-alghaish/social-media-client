import { Box, Button, Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import CommentsContainer from "./CommentsContainer";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import heart from "../../assets/images/heart.gif";

const Reaction1 = () => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [hidden, sethidden] = useState(true);

  const handleCommentsOpen = () => {
    setCommentsOpen(!commentsOpen);
  };

  return (
    <Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          <Button
            sx={{ color: "#F91880", opacity: hidden ? 1 : 0 }}
            className="like"
            startIcon={true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          ></Button>
          <img
            style={{
              position: "absolute",
              display: `${hidden ? "none" : "block"}`,
              top: "-150%",
              left: "-50%",
              zIndex: 1,
            }}
            src={heart}
          ></img>
        </Box>

        <Button
          sx={{ color: "text.secondary" }}
          onClick={handleCommentsOpen}
          startIcon={<CommentIcon />}
        ></Button>
        <Button sx={{ color: "text.secondary" }} startIcon={<SendIcon />}>
          share
        </Button>
      </Stack>
      {commentsOpen ? <CommentsContainer /> : false}
      <Divider />
    </Stack>
  );
};

export default Reaction1;
