import { setStoryViewer } from "../../redux/features/createStoryModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { Stack } from "@mui/system";
import FabricCanvas from "./ImageStoryViewer";

const Story = () => {
  const { storyViewer } = useSelector((state) => state.createStory);
  const data = [
    {
      position: {
        left: 112.27117361445573,
        top: 77.99281442010178,
      },
      scale: {
        width: 1,
        height: 1,
      },
      type: "image",
      angle: 15.675450440321807,
      fill: "rgb(0,0,0)",
      _id: "654f6226e280e781d1dc6185",
    },
    {
      position: {
        left: 126.87236180904524,
        top: 270.8464589235127,
      },
      scale: {
        width: 1,
        height: 1,
      },
      font: {
        size: 20,
        family: "Arial",
        weight: "bold",
      },
      type: "textbox",
      angle: 0,
      textAlign: "center",
      fill: "red",
      name: "my-text",
      _id: "654f6226e280e781d1dc6186",
    },
    {
      position: {
        left: 83.06822048724993,
        top: 159.48659552409663,
      },
      scale: {
        width: 1,
        height: 1,
      },
      font: {
        size: 20,
        family: "Arial",
        weight: "bold",
      },
      type: "textbox",
      angle: 333.1050657101229,
      textAlign: "center",
      fill: "#4D9137",
      name: "my-text",
      _id: "654f6226e280e781d1dc6187",
    },
  ];
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setStoryViewer(false));
  };
  return (
    <Modal
      open={storyViewer}
      onClose={handleClose}
      sx={{
        overflow: "scroll",
        background: "rgba(0,0,0,.3)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Stack
        sx={{
          width: "400px",
          maxWidth: "100%",
          height: "100vh",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <FabricCanvas objects={data} />
      </Stack>
    </Modal>
  );
};

export default Story;
