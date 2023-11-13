import { Box, Button, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useMediaQuery from "@mui/material/useMediaQuery";
import postApi from "../../api/modules/postApi";
import { useSelector } from "react-redux";
import { reacts } from "./reactionsSvg.js";

const Reactions = ({ post }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [react, setReact] = useState("");
  const { user } = useSelector((state) => state.user);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );
  const isLargeScreen = useMediaQuery("(min-width:961px)");

  const handleLongPress = () => {
    setShowReactions(true);
  };

  const handleMouseEnter = () => {
    setShowReactions(true);
  };

  const handleMouseLeave = () => {
    setShowReactions(false);
  };

  useEffect(() => {
    if (post.reactions?.haha?.users.includes(user?._id)) {
      setReact("haha");
    } else if (post.reactions?.love?.users.includes(user?._id)) {
      setReact("love");
    } else if (post.reactions?.like?.users.includes(user?._id)) {
      setReact("like");
    } else if (post.reactions?.angry?.users.includes(user?._id)) {
      setReact("angry");
    } else if (post.reactions?.wow?.users.includes(user?._id)) {
      setReact("wow");
    } else if (post.reactions?.sad?.users.includes(user?._id)) {
      setReact("sad");
    } else if (post.reactions?.partying?.users.includes(user?._id)) {
      setReact("partying");
    } else if (post.reactions?.lying?.users.includes(user?._id)) {
      setReact("lying");
    }
  }, []);

  const handleReaction = async (reactionType) => {
    setShowReactions(false);
    setReact((last) => {
      return last === reactionType ? false : reactionType;
    });
    const { response, error } = await postApi.reactPost(
      { reactionType },
      post._id
    );
  };

  return (
    <Box
      onMouseEnter={isLargeScreen ? handleMouseEnter : null}
      onMouseLeave={isLargeScreen ? handleMouseLeave : null}
      className="reactions-container"
      sx={{ width: "100%", height: "100%", position: "re", zIndex: "4" }}
    >
      <Button
        onClick={handleLongPress}
        size="small"
        sx={{ color: "text.primary" }}
        startIcon={
          react ? (
            <img
              style={{ width: "30px" }}
              src={
                react === "like"
                  ? reacts[0].url
                  : react === "love"
                  ? reacts[1].url
                  : react === "wow"
                  ? reacts[2].url
                  : react === "sad"
                  ? reacts[3].url
                  : react === "angry"
                  ? reacts[4].url
                  : react === "haha"
                  ? reacts[5].url
                  : react === "lying"
                  ? reacts[6].url
                  : react === "partying"
                  ? reacts[7].url
                  : undefined
              }
              alt=""
            />
          ) : (
            false
          )
        }
      >
        {react === "like" ? (
          reacts[0].id
        ) : react === "love" ? (
          reacts[1].id
        ) : react === "wow" ? (
          reacts[2].id
        ) : react === "sad" ? (
          reacts[3].id
        ) : react === "angry" ? (
          reacts[4].id
        ) : react === "haha" ? (
          reacts[5].id
        ) : react === "lying" ? (
          reacts[6].id
        ) : react === "partying" ? (
          reacts[7].id
        ) : (
          <Stack direction="row" gap="10px">
            <FavoriteBorderIcon /> React
          </Stack>
        )}
      </Button>
      {showReactions && (
        <figure className="reactions">
          {reacts.map((item) => (
            <img
              onTouchStart={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              style={{ touchAction: "manipulation" }}
              key={item.id}
              onClick={() => handleReaction(item.id)}
              src={item.url}
              alt={item.id}
            />
          ))}
        </figure>
      )}
    </Box>
  );
};
export default Reactions;
