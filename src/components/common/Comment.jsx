import { Avatar, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";

const Comment = ({ commentForm }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <Stack>
      <Stack
        component="form"
        onSubmit={commentForm.handleSubmit}
        direction="row"
        sx={{ alignItems: "flex-start", gap: "10px", position: "relative" }}
      >
        <Avatar src={user.profileImgUrl} />
        <TextField
          placeholder="comment"
          size="small"
          multiline
          type="text"
          id="text"
          label="make a comment"
          sx={{ flexGrow: 1 }}
          value={commentForm.values.text}
          InputProps={{
            endAdornment: (
              <IconButton
                type="submit"
                size="small"
                variant="contained"
                // loading={isLoading}
              >
                <SendIcon />
              </IconButton>
            ),
          }}
          onChange={commentForm.handleChange}
          error={
            commentForm.touched.text && commentForm.errors.text !== undefined
          }
          helperText={commentForm.touched.text && commentForm.errors.text}
        />
      </Stack>
    </Stack>
  );
};

export default Comment;
