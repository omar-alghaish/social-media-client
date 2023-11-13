// import {
//   Avatar,
//   Box,
//   Button,
//   IconButton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { deepOrange } from "@mui/material/colors";
// import img from "../../assets/images/i.jpg"
// import React, { useRef, useState } from "react";
import FullScreenToggle from "./FullScreenToggle";
// import video from "../../assets/videos/v1.mp4";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
// import video2 from "../../assets/videos/video1.mp4"

// const Real = ({ playing, onTogglePlay }) => {
//   const backgroundVideoRef = useRef(null);
//   const realVideoRef = useRef(null);
//   const handleText = (e) => {
//     e.target.classList.toggle("expanded");
//   };
//   const togglePlayPause = () => {
//     if (realVideoRef.current.paused) {
//       realVideoRef.current.play();
//       backgroundVideoRef.current.play();
//     } else {
//       realVideoRef.current.pause();
//       backgroundVideoRef.current.pause();
//     }
//     onTogglePlay();
//   };

//   //   const handleVideoEnd = () => {
//   //     setIsPlaying(false); // Update isPlaying state to false when the video ends
//   //   };

//   const handleContainerClick = (event) => {
//     // Check if the click target is not within the icon-list
//     if (!event.target.closest(".icon-list")) {
//       togglePlayPause();
//     }
//   };

//   return (
//     <Stack className="real">
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           left: "0",
//           top: "0",
//           zIndex: 3,
//         }}
//         onClick={handleContainerClick}
//       />
//       <Box className="video-background-container">
//         <video
//           ref={backgroundVideoRef}
//           className="video-background"
//           autoPlay
//           muted
//         >
//           <source src={video2} type="video/mp4" />
//           {/* Add other video sources if needed */}
//         </video>
//       </Box>
//       <Box className="video-real-container">
//         <video
//           ref={realVideoRef}
//           className="video-real"
//           width="100%"

//           //   onEnded={handleVideoEnd}
//         >
//           <source src={video2} type="video/mp4" />
//           {/* Add other video sources if needed */}
//         </video>
//       </Box>
//       <Button className="play-button">
//         {playing ? <PauseCircleIcon sx={{width:"50px", height:"50px"}} /> : <PlayCircleIcon sx={{width:"50px", height:"50px"}} />}
//       </Button>
//       <Stack className="icon-list">
//         <FullScreenToggle />
//         <Button  >
//           <FavoriteBorderIcon className="icon-button"/>
//         </Button>
//         <Button  >
//           <CommentIcon className="icon-button"/>
//         </Button>
//         <Button >
//           <SendIcon className="icon-button"/>
//         </Button>
//       </Stack>
//       <Stack className="content">
//         <Stack gap="10px">
//           <Avatar
//           src={img}
//             sx={{
//               width: "50px",
//               height: "50px",
//               bgcolor: deepOrange[500],
//               borderRadius: "20px",
//             }}
//             variant="rounded"
//           />
//           <Typography variant="" component="h2">Omar alghaish</Typography>
//         </Stack>
//         <Typography
//           onClick={handleText}
//           className="text real-text"
//           variant="body2"
//           sx={{ color: "text.secondary" }}
//         >
//             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quaerat molestias fuga culpa nihil, ducimus officia id! Nam deserunt odit et laborum corrupti vitae magnam dolor quo? Animi, accusamus. Inventore rerum distinctio vitae assumenda perspiciatis itaque magnam pariatur, voluptatum doloribus possimus suscipit doloremque corporis iure iste dignissimos quis sequi facere ratione iusto nobis. Cum odio, mollitia eligendi harum delectus sunt repudiandae. Minus sapiente, dolores asperiores maxime cupiditate reiciendis doloremque dolor, a beatae vero velit quasi totam possimus aliquid hic ratione quod, temporibus exercitationem repellendus deleniti architecto est officiis. Modi accusantium maxime, quia error animi esse praesentium, corrupti magnam temporibus rem inventore perferendis eius distinctio beatae magni! Expedita, tempore numquam mollitia dolore enim veniam dignissimos nesciunt, at voluptas optio iste praesentium eligendi reprehenderit fugiat amet provident nisi tempora. Autem labore error sequi quia vel dicta assumenda libero? Repudiandae quis odio adipisci nulla accusamus, fugiat officia quibusdam molestias, molestiae doloremque cumque dignissimos maiores nesciunt. Illo, vero adipisci. Harum minima soluta hic nemo, cumque, unde blanditiis repellendus recusandae dignissimos dicta quae. Vel culpa expedita cumque delectus magnam, sequi eius fugiat, nesciunt maxime a deleniti commodi eveniet! Amet doloribus nisi nam voluptates. Magni a architecto molestias aliquid repellendus ratione aspernatur, rem aperiam voluptas dolor.
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
//           impedit? Vitae iste ipsa magni nam quibusdam? Iste architecto saepe
//           magni alias mollitia sint, quidem beatae sapiente, culpa quibusdam
//           nihil inventore!
//         </Typography>
//       </Stack>
//     </Stack>
//   );
// };

// export default Real;

import React, { useRef, useState, useEffect } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import Button from "@mui/material/Button";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import img from "../../assets/images/i.jpg";
import video2 from "../../assets/videos/video1.mp4";
import video3 from "../../assets/videos/v4.mp4";

import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Real = ({ onTogglePlay, playing,videoSource }) => {
  const backgroundVideoRef = useRef(null);
  const realVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
console.log(videoSource)

   let timeoutId;

    const handleMouseMovement = () => {
      setShowControls(true);
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };
  useEffect(() => {
   

    document.addEventListener("mousemove", handleMouseMovement);

    return () => {
      document.removeEventListener("mousemove", handleMouseMovement);
      clearTimeout(timeoutId);
    };
  }, []);

  const togglePlayPause = () => {
    handleMouseMovement()
    if (playing) {
      realVideoRef.current.pause();
      backgroundVideoRef.current.pause();
    } else {
      realVideoRef.current.play();
      backgroundVideoRef.current.play();
    }
    setIsPlaying(!playing);
    onTogglePlay();
  };

  const handleText = (e) => {
    e.target.classList.toggle("expanded");
  };

  return (
    <Stack className="real">
      <IconButton
      onClick={handleBack}
        sx={{
            margin:"10px",
          position: "absolute",
          zIndex: "4",
          width: "50px",
          height: "50px",
        }}
        color="primary"
      >
        <ArrowBackIosIcon sx={{ml:"10px"}}/>
      </IconButton>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: 3,
        }}
        onClick={togglePlayPause}
      />
      <Box className="video-background-container">
        <video
          ref={backgroundVideoRef}
          className="video-background"
          autoPlay
          muted
        >
          <source src={videoSource.src} type="video/mp4" />
        </video>
      </Box>
      <Box className="video-real-container">
        <video ref={realVideoRef} className="video-real" width="100%">
          <source src={videoSource.src} type="video/mp4" />
        </video>
      </Box>
      <Button className={`play-button ${showControls ? "show" : "hide"}`}>
        {playing ? (
          <PauseCircleIcon sx={{ width: "50px", height: "50px" }} />
        ) : (
          <PlayCircleIcon sx={{ width: "50px", height: "50px" }} />
        )}
      </Button>
      {/* Rest of your component */}
      <Stack className={`icon-list ${showControls ? "show" : "hide"}`}>
        <FullScreenToggle />
        <Button>
          <FavoriteBorderIcon className="icon-button" />
        </Button>
        <Button>
          <CommentIcon className="icon-button" />
        </Button>
        <Button>
          <SendIcon className="icon-button" />
        </Button>
      </Stack>
      <Stack className={`content ${showControls ? "show" : "hide"}`}>
        <Stack gap="10px">
          <Avatar
            src={img}
            sx={{
              width: "50px",
              height: "50px",
              bgcolor: deepOrange[500],
              borderRadius: "20px",
            }}
            variant="rounded"
          />
          <Typography variant="" component="h2">
            Omar alghaish
          </Typography>
        </Stack>
        <Typography
          onClick={handleText}
          className="text real-text"
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          quaerat molestias fuga culpa nihil, ducimus officia id! Nam deserunt
          odit et laborum corrupti vitae magnam dolor quo? Animi, accusamus.
          Inventore rerum distinctio vitae assumenda perspiciatis itaque magnam
          pariatur, voluptatum doloribus possimus suscipit doloremque corporis
          iure iste dignissimos quis sequi facere ratione iusto nobis. Cum odio,
          mollitia eligendi harum delectus sunt repudiandae. Minus sapiente,
          dolores asperiores maxime cupiditate reiciendis doloremque dolor, a
          beatae vero velit quasi totam possimus aliquid hic ratione quod,
          temporibus exercitationem repellendus deleniti architecto est
          officiis. Modi accusantium maxime, quia error animi esse praesentium,
          corrupti magnam temporibus rem inventore perferendis eius distinctio
          beatae magni! Expedita, tempore numquam mollitia dolore enim veniam
          dignissimos nesciunt, at voluptas optio iste praesentium eligendi
          reprehenderit fugiat amet provident nisi tempora. Autem labore error
          sequi quia vel dicta assumenda libero? Repudiandae quis odio adipisci
          nulla accusamus, fugiat officia quibusdam molestias, molestiae
          doloremque cumque dignissimos maiores nesciunt. Illo, vero adipisci.
          Harum minima soluta hic nemo, cumque, unde blanditiis repellendus
          recusandae dignissimos dicta quae. Vel culpa expedita cumque delectus
          magnam, sequi eius fugiat, nesciunt maxime a deleniti commodi eveniet!
          Amet doloribus nisi nam voluptates. Magni a architecto molestias
          aliquid repellendus ratione aspernatur, rem aperiam voluptas dolor.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
          impedit? Vitae iste ipsa magni nam quibusdam? Iste architecto saepe
          magni alias mollitia sint, quidem beatae sapiente, culpa quibusdam
          nihil inventore!
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Real;
