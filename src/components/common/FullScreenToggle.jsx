import { Button } from "@mui/material";
import React, { useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const FullScreenToggle = ({ style }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleToggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  return (
    <Button onClick={handleToggleFullScreen} style={style}>
      {isFullScreen ? <FullscreenExitIcon className="icon-button"/> : <FullscreenIcon className="icon-button"/>}
    </Button>
  );
};

export default FullScreenToggle;
