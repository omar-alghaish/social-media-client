import { getRandomColor } from "../../utils/randomColor";

import React, { useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setImage,
  setObjects,
} from "../../redux/features/createStoryModalSlice";

const ImageStory = ({ image }) => {
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const { editor, onReady } = useFabricJSEditor();

  const deleteSelections = () => {
    editor?.canvas.getActiveObjects().forEach((object) => {
      editor?.canvas.remove(object);
    });
  };

  const changeTextColor = () => {
    const activeObject = editor?.canvas.getActiveObject();
    if (activeObject?.type === "textbox") {
      activeObject.set("fill", getRandomColor());
      editor?.canvas.renderAll();
    }
  };

  const onAddText = () => {
    try {
      editor?.canvas.add(
        new fabric.Textbox("Type something...", {
          fill: "red",
          fontSize: 20,
          fontFamily: "Arial",
          fontWeight: "bold",
          textAlign: "center",
          name: "my-text",
        })
      );
      editor?.canvas.renderAll();
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (e) => {
    dispatch(setImage(e.target.files[0]));
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;

        fabric.Image.fromURL(dataURL, function (img) {
          img.set({
            left: 0,
            top: 0,
          });

          editor?.canvas.clear();
          editor?.canvas.add(img);
          editor?.canvas.renderAll();
        });
      };
      setIsSubmitted(true);
      reader.readAsDataURL(selectedFile);
    }
  };

  let ob = [];

  const canvasObjects = editor?.canvas.getObjects().map((obj) => {
    const objData = {
      type: obj.type,
      scale: { width: obj.scaleX, height: obj.scaleY },
      angle: obj.angle,
      fill: obj.fill,
      name: obj.name,
      font: {
        size: obj.fontSize,
        weight: obj.fontWeight,
        family: obj.fontFamily,
      },
      textAlign: obj.textAlign,
      position: { left: obj.left, top: obj.top },
    };
    // return objData;
    ob.push(objData);
    obj.on("modified", () => {
      dispatch(setObjects(ob));
    });
  });

  return (
    <Box className={"root-img"} sx={{ position: "relative" }}>
      {isSubmitted && (
        <Box
          className={"aside-img"}
          sx={{ position: "absolute", left: 0, zIndex: 1, bottom: 0 }}
        >
          <div onClick={onAddText}>Add Text</div>
          <div onClick={changeTextColor}>Change Text Color</div>
          <div onClick={deleteSelections}>Delete selections</div>
        </Box>
      )}

      <Box className={"main-img"}>
        {!isSubmitted && (
          <Box className={"imageForm-img"}>
            <input
              type="file"
              onChange={onFileChange}
              value={image}
              accept="image/*"
            />
          </Box>
        )}
        <FabricJSCanvas className={"canvas-img"} onReady={onReady} />
      </Box>
    </Box>
  );
};

export default ImageStory;
