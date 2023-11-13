import { useTheme } from "@mui/material";
import React from "react";
import ContentLoader from "react-content-loader";

const ProfileCard = (props) => {
  const theme = useTheme()
  return (
    <ContentLoader
      viewBox="0 0 100% 350"
      backgroundColor={theme.palette.background.loading1}
      foregroundColor={theme.palette.background.loading2}
      style={{ width: "100%", height: "350" }}
      {...props}
    >
      <rect x="3" y="3" rx="20" ry="20" width="99%" height="99%" />
    </ContentLoader>
  );
};

ProfileCard.metadata = {
  name: "René Hinojosa",
  github: "rene-ph",
  description: "Profile Card",
  filename: "ProfileCard",
};

export default ProfileCard;
