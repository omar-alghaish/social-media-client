import { Avatar, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import MainContainer from "../components/common/MainContainer";
import userApi from "../api/modules/userApi";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const search = async (keyword) => {
    const { response, error } = await userApi.search(keyword);
    setData(response);
  };

  return (
    <MainContainer>
      <Stack sx={{ padding: "0 20px", width: "700px", maxWidth: "100%" }}>
        <TextField
          fullWidth
          id="outlined-search"
          label="Search"
          type="search"
          onChange={(e) => search(e.target.value)}
          sx={{ pb: "20px" }}
        />
        <Stack gap="10px">
          {data?.data?.map(
            (elm) =>
              (
                <Stack
                  key={elm._id}
                  onClick={() => navigate(`/users/${elm._id}`)}
                  direction="row"
                  gap="10px"
                  sx={{ alignItems: "", cursor: "pointer" }}
                >
                  <Avatar src={elm.profileImgUrl} />
                  <Stack sx={{ flexGrow: 1 }}>
                    <Typography>{elm.name}</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {elm.email}
                    </Typography>
                    <Divider sx={{ paddingTop: "10px" }} />
                  </Stack>
                </Stack>
              ) || null
          )}
        </Stack>
      </Stack>
    </MainContainer>
  );
};

export default Search;
