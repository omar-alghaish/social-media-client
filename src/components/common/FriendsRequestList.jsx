import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "./MainContainer";
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/modules/userApi";

const FriendsRequestList = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [friendrequests, setFriendrequests] = useState();
  const [toggle, setToggle] =useState(false)
  const [isLoading, setIsLoading] = useState(true);

  const handleAcceptRequest = async (id) => {
    const { response, error } = await userApi.acceptFriend({ id });
    setToggle(false)
  };

  useEffect(() => {
    const getFriendRequests =async()=>{
      const { response, error } = await userApi.getFriendRequests();
    setFriendrequests(response?.data);
    console.log(response)
    setIsLoading(false);
    }
    getFriendRequests()
    setToggle(true)
  }, [toggle]);

  console.log(friendrequests);
  return (
    <MainContainer>
      <Stack direction="row">
        <Typography sx={{ pb: "20px" }} variant="" component="h1">
          Friend requests {friendrequests?.length}
        </Typography>
      </Stack>

      {friendrequests?.length > 0
        ? friendrequests?.map((request) => (
            <Stack key={request._id}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack
                  direction="row"
                  gap="10px"
                  alignItems="center"
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/users/${request._id}`)}
                >
                  <Avatar src={request.profileImgUrl} />
                  <Typography>{request.name}</Typography>
                </Stack>
                <Button onClick={() => handleAcceptRequest(request._id)}>
                  Accept
                </Button>
              </Stack>

              <Divider sx={{ mt: "10px" }} />
            </Stack>
          ))
        : false}
      {}
    </MainContainer>
  );
};

export default FriendsRequestList;
