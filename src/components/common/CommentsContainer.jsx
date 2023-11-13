import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import postApi from "../../api/modules/postApi";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import Reaction1 from "./Reaction1";
import Reactions from "./Reactions";

const CommentsContainer = ({ comments, post }) => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [Listcomments, setListComments] = useState(comments);

  const commentForm = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const { response, error } = await postApi.makeComment({
        ...values,
        postId: post._id,
      });
      commentForm.resetForm();

      setIsLoading(false);
      if (response) {
        setListComments(response.data);
      }
    },
  });
  return (
    <Stack gap="10px">
      {Listcomments.map((comment) => (
        <Box>
          <Stack direction="row" sx={{ alignItems: "flex-start", gap: "10px" }}>
            <Avatar src={comment?.userProfile} />
            <Stack sx={{ flexGrow: 1 }}>
              <Typography>{comment.userName}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {comment.text}
              </Typography>
            </Stack>
            <Stack></Stack>
          </Stack>
     
        </Box>
      ))}

      <Comment commentForm={commentForm} />
    </Stack>
  );
};

export default CommentsContainer;
