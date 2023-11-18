import { Button, Divider, Typography } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import React from "react";

const HomeRightSide = () => {
  const theme = useTheme();

  return (
    <Box
      className="right-side-home-page"
      sx={{
        padding: "20px",
        paddingBottom: "20px",
        background: theme.palette.background.paper,
        borderRadius: "20px",
      }}
    >
      <Typography fontSize="20px">Trend for you</Typography>
      <Typography
        textTransform="uppercase"
        sx={{
          color: "text.secondary",
          mt: "20px",
          mb: "10px",
          fontSize: "13px",
        }}
        variant="body2"
      >
        trending in egypt
      </Typography>
      <Stack>
        <Box sx={{ p: "10px" }}>
          <Typography>1- #web</Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: "13px" }}
            variant="body2"
          >
            26.2k Post
          </Typography>
          <Divider sx={{ p: "5px" }} />
        </Box>
        <Box sx={{ p: "10px" }}>
          <Typography>2- #ReactJs</Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: "13px" }}
            variant="body2"
          >
          26.2k Post
          </Typography>
          <Divider sx={{ p: "5px" }} />
        </Box>
        <Box sx={{ p: "10px" }}>
          <Typography>3- #web</Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: "13px" }}
            variant="body2"
          >
            26.2k Post
          </Typography>
          {/* <Divider sx={{ p: "5px" }} /> */}
        </Box>
        <Button>See all</Button>

      </Stack>
    </Box>
  );
};

export default HomeRightSide;
