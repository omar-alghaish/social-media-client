import React, { useEffect, useState } from "react";
import MainContainer from "../components/common/MainContainer";
import {
  Avatar,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import notificationApi from "../api/modules/notificationApi.js";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";

const Notifications = () => {
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);

  const theme = useTheme();

  const handleLoadMore = async () => {
    const { response, error } = await notificationApi.getNotification(page);
    console.log(response);

    if (!error) {
      setPage(page + 1); 
      setData((prev) => [...prev, ...response.data]); 
    }
  };

  useEffect(() => {
    const getNotifications = async () => {
      const { response, error } = await notificationApi.getNotification(page);
      if (!error) {
        setData(response.data);
        setPage(page + 1); 
      }
    };
    getNotifications();
  }, []);

  return (
    <MainContainer className="notification-container">
      <Stack direction="row" alignItems="center" gap="10px" pb="20px">
        <Typography variant="" component="h1" gap="10px">
          Notifications
        </Typography>
        <Typography
          variant=""
          component="h2"
          color={theme.palette.primary.main}
        >
          {data?.results}
        </Typography>
      </Stack>
      <Stack>
        {data?.map((item) => (
          <Stack
            sx={{
              position: "relative",
              justifyContent: "center",
              paddingY: "10px",
            }}
          >
            {item.title === "love" ? (
              <FavoriteIcon
                sx={{ color: "#F91880", position: "absolute", right: "0" }}
              />
            ) : item.title === "haha" ? (
              <img
                className="react-img"
                src="https://www.dropbox.com/s/vdg0a8i0kyd16zk/haha.gif?raw=1"
                alt="Haha emoji"
              />
            ) : item.title === "angry" ? (
              <img
                className="react-img"
                src="https://www.dropbox.com/s/kail2xnglbutusv/angry.gif?raw=1"
                alt="Angry emoji"
              />
            ) : item.title === "wow" ? (
              <img
                className="react-img"
                src="https://www.dropbox.com/s/ydl0fm5kayxz0e5/wow.gif?raw=1"
                alt="Wow emoji"
              />
            ) : item.title === "like" ? (
              <img
                className="react-img"
                src="https://www.dropbox.com/s/rgfnea7od54xj4m/like.gif?raw=1"
                alt="Like emoji"
              />
            ) : item.title === "sad" ? (
              <img
                className="react-img"
                src="https://www.dropbox.com/s/52n5woibt3vrs76/sad.gif?raw=1"
                alt="Sad emoji"
              />
            ) : (
              false
            )}
            <Stack
              direction="row"
              sx={{ height: "", alignItems: "center", gap: "10px" }}
              key={item?._id}
            >
              <Avatar src={item?.from?.profileImgUrl} />
              <Stack>
                <Typography>{item?.text}</Typography>
                <Typography color={theme.palette.text.secondary}>
                  {dayjs(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ paddingY: "10px" }} />
          </Stack>
        ))}
      </Stack>
      <Button onClick={handleLoadMore}>Loade more</Button>
    </MainContainer>
  );
};

export default Notifications;
