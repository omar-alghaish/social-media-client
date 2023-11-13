import { Avatar, Box } from "@mui/material";
import React, { useState } from "react";

const ImagePlaceHolder = ({ form }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    form.setFieldValue("profileImg", event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };
  return (
    <Box
      variant="text"
      component="label"
      sx={{
        width: "70px",
        height: "70px",
        borderColor: "primary",
      }}
      style={{ cursor: "pointer" }}
    >
      {image ? (
        <Avatar sx={{ height: "70px", width: "70px" }} src={image} />
      ) : (
        <Avatar sx={{ height: "70px", width: "70px" }} />
      )}

      <input
        id="profileImg"
        name="profileImg"
        type="file"
        hidden
        accept="image/*"
        onChange={handleImageChange}
      />
    </Box>
  );
};

export default ImagePlaceHolder;
