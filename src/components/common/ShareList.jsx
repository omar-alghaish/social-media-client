import whatsAppSvg from "../../assets/images/socialShare/whatsApp.svg";
import facebookSvg from "../../assets/images/socialShare/facebook.svg";
import twitterSvg from "../../assets/images/socialShare/twitter.svg";
import linkedinSvg from "../../assets/images/socialShare/linkedin.svg";
import telegramSvg from "../../assets/images/socialShare/telegram.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import CheckIcon from "@mui/icons-material/Check";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from "react-share";

import {
  Avatar,
  Backdrop,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

const ShareList = ({ shareOpen, handleShareOpen, data }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useSelector((state) => state.user);

  const theme = useTheme();

  const currentUrl = window.location.href;
  const urlObject = new URL(currentUrl);
  const protocol = urlObject.protocol;
  const domain = urlObject.hostname;

  const shareUrl = `${protocol}//${domain}/post/${data?._id}/`;

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const sharePost = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: data.userName,
          text: data.content,
          url: shareUrl,
        });
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  const drawer = (
    <Box
      sx={{
        background: theme.palette.background.paper,
        width: "400px",
        maxWidth: "100%",
        borderRadius: "20px 20px 0 0",
      }}
    >
      <Stack gap="15px" direction="row" padding="20px 10px">
        <FacebookShareButton url={shareUrl}>
          <img className="social-share-icon" src={facebookSvg} alt="" />
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl}>
          <img className="social-share-icon" src={whatsAppSvg} />
        </WhatsappShareButton>
        <TwitterShareButton url={shareUrl}>
          <img className="social-share-icon" src={twitterSvg} />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl}>
          <img className="social-share-icon" src={linkedinSvg} />
        </LinkedinShareButton>
        <TelegramShareButton url={shareUrl}>
          <img className="social-share-icon" src={telegramSvg} />
        </TelegramShareButton>
      </Stack>
      <Divider />
      <Stack gap="15px" direction="row" padding="20px 10px">
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          {isCopied ? (
            <p style={{ color: "#00FF00", width: "45px", height: "45px" }}>
              Copied
            </p>
          ) : (
            <>
              <IconButton
                onClick={handleCopyClick}
                disabled={isCopied}
                sx={{
                  background: theme.palette.text.primary,
                  color: theme.palette.background.default,
                  width: "45px",
                  height: "45px",
                }}
              >
                <ContentCopyIcon />
              </IconButton>
              <Typography>copy</Typography>
            </>
          )}
        </Stack>
        <Stack>
          <IconButton
            sx={{
              background: theme.palette.text.primary,
              color: theme.palette.background.default,
              width: "45px",
              height: "45px",
            }}
            onClick={sharePost}
          >
            <ShareIcon />
          </IconButton>
          <Typography>Share</Typography>
        </Stack>
      </Stack>
      <Divider />
      <List>
        {user._id !== data?.user ? (
          <ListItemButton>
            <ListItemIcon>
              <CheckIcon sx={{ color: theme.palette.text.secondary }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  follow {data?.userName}
                </Typography>
              }
            />
          </ListItemButton>
        ) : (
          false
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <SwipeableDrawer
        open={shareOpen}
        className="sidebar"
        sx={{
          background: "red",
          position: "relative",
          width: "100vw",
          overflow: "hidden",

          "& .MuiDrawer-paper": {
            background: "transparent",
            boxShadow: "none",
            boxSizing: "border-box",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        onClose={handleShareOpen}
        onOpen={handleShareOpen}
        anchor="bottom"
      >
        {drawer}
      </SwipeableDrawer>
      <Backdrop
        sx={{
          backdropFilter: "blur(12px)",
          zIndex: (theme) => theme.zIndex.drawer,
        }}
        open={shareOpen}
        onClick={handleShareOpen}
      />
    </>
  );
};

export default ShareList;
