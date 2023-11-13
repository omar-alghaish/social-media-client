import { useTheme } from "@mui/material";
import React from "react";
import ContentLoader from "react-content-loader";

const LoadingPage = (props) => {
  const theme = useTheme();
  return (
    <ContentLoader
    // backgroundColor="#FF8C00"
    // foregroundColor="#FF4500"
    backgroundColor={theme.palette.background.loading1}
    foregroundColor={theme.palette.background.loading2}
      viewBox="0 0 400 460"
      {...props}
    >
      <circle cx="20" cy="31" r="18" />
      <rect x="50" y="25" rx="2" ry="2" width="100%" height="10" />
      {/* <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> */}
      <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
    </ContentLoader>
  );
};

export default LoadingPage;
