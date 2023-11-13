import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const PostComponent = () => {
  const postOwnerSocketId = 'postOwnerSocketId'; // Replace with the actual post owner's socket ID

  const handleLikePost = () => {
    // Simulate the like post action (replace this with actual logic)
    // For example, send an API request to the server to handle the like action

    // Emit event to indicate that a post has been liked
    socket.emit('likePost', { postOwnerSocketId });
  };

  // Listen for post liked event
  useEffect(() => {
    socket.on('postLiked', (data) => {
      // Handle post liked notification
      console.log(data.message); // Output: 'Your post was liked!'
      // You can update the UI or show a notification to the post owner
    });

    return () => {
      // Clean up event listener if necessary
      // socket.off('postLiked');
    };
  }, []);

  return (
    <div>
      {/* Your component JSX */}
      <button onClick={handleLikePost}>Like Post</button>
    </div>
  );
};

export default PostComponent;