import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:3000");

const PostComponent = () => {
  const postOwnerSocketId = "postOwnerSocketId";

  const handleLikePost = () => {
    socket.emit("likePost", { postOwnerSocketId });
  };

  useEffect(() => {
    socket.on("postLiked", (data) => {
      console.log(data.message);
    });

    return () => {};
  }, []);

  return (
    <div>
      <button onClick={handleLikePost}>Like Post</button>
    </div>
  );
};

export default PostComponent;
