import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import postApi from "../../api/modules/postApi";

import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import AudioPlayer from "react-h5-audio-player";
import TextWithTags from "./TextWithTags";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import storyApi from "../../api/modules/storyApi";
import {
  setCreateStoryOpen,
  setStory,
} from "../../redux/features/createStoryModalSlice";
import ImageStory from "./StoryImage";
const StoryForm = () => {
  const { createStoryModalOpen, objects, image } = useSelector(
    (state) => state.createStory
  );
  console.log(image);
  const [mediaList, setMediaList] = useState([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const dispatch = useDispatch();
  console.log(objects);

  const StoryForm = useFormik({
    initialValues: {
      content: "",
      expiresInDays: 1,
      media: [],
    },
    validationSchema: Yup.object({
      content: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setErrorMessage(undefined);
        setIsLoading(true);
        const formData = new FormData();
        formData.append("content", values.content);

        formData.append("objects", JSON.stringify(objects));
        formData.append("expiresInDays", values.expiresInDays);
        // for (let i = 0; i < values.media.length; i++) {
        //   formData.append("media", values.media[i]);
        // }
        formData.append("media", image);

        const { response, error } = await storyApi.createStory(formData);
        setIsLoading(false);
        console.log(error);

        if (response) {
          StoryForm.resetForm();
          dispatch(setStory(response.data));
          dispatch(setCreateStoryOpen(false));
          console.log(response);
        }
        if (error) setErrorMessage(error.message);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    },
  });
  const handleClose = () => {
    dispatch(setCreateStoryOpen(false));
    StoryForm.resetForm();
  };
  return (
    <div
      open={createStoryModalOpen}
      // onClose={handleClose}
      style={{
        overflow: "scroll",
        width:"100%",
        height:"100vh",
        display: createStoryModalOpen ? "block" : "none",
        background:"rgba(0,0,0,.3)",
        backdropFilter:"blur(12px)",
        position:"fixed",
        top:0,
        left:0,
        zIndex:2000
      }}
     
    >
      <Stack
        className="create-post"
        component="form"
        enctype="multipart/form-data"
        onSubmit={StoryForm.handleSubmit}
        display={createStoryModalOpen ? "block" : "none"}
        sx={{ background: theme.palette.background.paper }}
      >
        <Stack spacing={2} direction="column">
          {/* <TextField
            // id="outlined-textarea"
            placeholder="content"
            multiline
            type="text"
            id="content"
            label="content"
            value={StoryForm.values.content}
            onChange={StoryForm.handleChange}
            error={
              StoryForm.touched.content &&
              StoryForm.errors.content !== undefined
            }
            helperText={StoryForm.touched.content && StoryForm.errors.content}
          >
            {" "}
          </TextField> */}
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-select-small-label">Date</InputLabel>
            <Select
              id="expiresInDays"
              name="expiresInDays"
              value={StoryForm.values.expiresInDays}
              label="Date"
              onChange={StoryForm.handleChange}
            >
              <MenuItem value={1}>1 day</MenuItem>
              <MenuItem value={2}>2 days</MenuItem>
              <MenuItem value={3}>3 days</MenuItem>
            </Select>
          </FormControl>
         
          <ImageStory />

          <Stack></Stack>
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
            <Button onClick={handleClose}>Cancele</Button>
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
    </div>
  );
};

export default StoryForm;
