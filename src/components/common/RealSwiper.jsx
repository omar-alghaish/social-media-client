import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Real from "./Real";
import { Keyboard, Pagination, Navigation } from "swiper/modules";

const videoSources = [
  // { src: video2, type: "video/mp4" },
  // { src: video3, type: "video/mp4" },
  // Add more video sources as needed
];

const RealSwiper = () => {
  const [swiper, setSwiper] = useState(null);
  const [isPlaying, setIsPlaying] = useState(
    Array(videoSources.length).fill(true)
  );

  const handleTogglePlay = (index) => {
    const updatedPlayingState = [...isPlaying];
    updatedPlayingState[index] = !updatedPlayingState[index];
    setIsPlaying(updatedPlayingState);
  };

  const handleSlideChange = () => {
    if (swiper) {
      const activeIndex = swiper.realIndex;
      const videos = document.querySelectorAll(".video-real");
      videos.forEach((video, index) => {
        if (index === activeIndex && isPlaying[activeIndex]) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        className="reals"
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard, Pagination, Navigation]}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChangeTransitionEnd={handleSlideChange}
      >
        {videoSources.map((video, index) => (
          <SwiperSlide className="real-swiper-slide" key={index}>
            <Real
              videoSource={video}
              playing={isPlaying[index]}
              onTogglePlay={() => handleTogglePlay(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default RealSwiper;
