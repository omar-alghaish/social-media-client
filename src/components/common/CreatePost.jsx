import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import postApi from "../../api/modules/postApi";
import {
  setCreatePostOpen,
  setPost,
} from "../../redux/features/creatPostModalSlice";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import AudioPlayer from "react-h5-audio-player";
import TextWithTags from "./TextWithTags";

const CreatePost = () => {
  const { createPostModalOpen } = useSelector((state) => state.createPost);
  const [mediaList, setMediaList] = useState([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const dispatch = useDispatch();
  const handleCancele = () => {
    dispatch(setCreatePostOpen(false));
  };

  const PostForm = useFormik({
    initialValues: {
      content: "",
      media: [],
    },
    validationSchema: Yup.object({
      content: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        setErrorMessage(undefined);
        setIsLoading(true);
        const formData = new FormData();
        formData.append("content", values.content);
        for (let i = 0; i < values.media.length; i++) {
          formData.append("media", values.media[i]);
        }
        // Send POST request to the server
        const { response, error } = await postApi.createPost(formData);
        setIsLoading(false);
        if (response) {
          PostForm.resetForm();
          dispatch(setPost(response.data));
          dispatch(setCreatePostOpen(false));
        }
        if (error) setErrorMessage(error.message);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    },
  });
  const handleClose = () => {
    dispatch(setCreatePostOpen(false));
    PostForm.resetForm();
  };

  return (
    <Modal
      open={createPostModalOpen}
      onClose={handleClose}
      sx={{ overflow: "scroll" }}
    >
      <Stack
        className="create-post"
        component="form"
        enctype="multipart/form-data"
        onSubmit={PostForm.handleSubmit}
        display={createPostModalOpen ? "block" : "none"}
        sx={{ background: theme.palette.background.paper }}
      >
        <Stack spacing={2} direction="column">
          <TextField
            // id="outlined-textarea"
            placeholder="content"
            multiline
            type="text"
            id="content"
            label="content"
            value={PostForm.values.content}
            onChange={PostForm.handleChange}
            error={
              PostForm.touched.content && PostForm.errors.content !== undefined
            }
            helperText={PostForm.touched.content && PostForm.errors.content}
          >  </TextField>
          <Box
            variant="text"
            component="label"
            sx={{
              border: "solid ",
              borderColor: "primary",
            }}
            style={{ cursor: "pointer" }}
          >
            files
            <input
              multiple
              id="media"
              name="media"
              type="file"
              hidden
              onChange={(event) => {
                // Get selected files from the event
                const selectedFiles = event.currentTarget.files;

                // Convert the selected files to an array of objects with url and type properties
                const filesArray = Array.from(selectedFiles).map((file) => {
                  return {
                    url: URL.createObjectURL(file),
                    type: file.type,
                  };
                });

                setMediaList(filesArray);
                PostForm.setFieldValue("media", event.target.files);
              }}
            />
          </Box>
          <Stack>
            <Swiper
              spaceBetween={10}
              slidesPerView="auto"
              grabCursor={true}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              style={{ width: "100%", height: "max-content" }}
            >
              {mediaList.map((media, index) => {
                const { url, type } = media;
                return (
                  <SwiperSlide key={index} style={{ width: "max-content" }}>
                    {type.startsWith("image") ? (
                      <img
                        className="postImg"
                        src={url}
                        alt={`Image ${index}`}
                        style={{ maxWidth: "400px" }}
                      />
                    ) : type.startsWith("audio") ? (
                      <audio controls>
                        <source src={url} type={type} />
                        Your browser does not support the audio element.
                      </audio>
                    ) : type.startsWith("video") ? (
                      <ReactPlayer
                        url={url}
                        controls={true}
                        width="700px"
                        height="400px"
                        style={{
                          background: "",
                          borderRadius: "20px",
                          maxWidth: "400px",
                        }}
                      />
                    ) : (
                      <Typography>Unknown File Type</Typography>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
          <Stack direction="row" gap="10px">
            <LoadingButton
              sx={{ borderRadius: "20px" }}
              type="submit"
              // fullWidth
              size="large"
              variant="contained"
              // sx={{ marginTop: 4 }}
              loading={isLoading}
            >
              create
            </LoadingButton>
            <Button onClick={handleCancele}>Cancele</Button>
          </Stack>
        </Stack>

        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Stack>
    </Modal>
  );
};

export default CreatePost;
