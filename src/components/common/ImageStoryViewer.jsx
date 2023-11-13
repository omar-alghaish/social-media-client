import React, { useEffect } from "react";
import { fabric } from "fabric";

const FabricCanvas = ({ objects }) => {
  useEffect(() => {
    const canvas = new fabric.Canvas("fabricCanvas", {});
    const resizeCanvas = () => {
      const parent = canvas.wrapperEl.parentNode;
      canvas.setWidth(parent.clientWidth);
      canvas.setHeight(parent.clientHeight);
      canvas.renderAll();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    objects.forEach((object) => {
      if (object.type === "image") {
        fabric.Image.fromURL("path/to/your/image.jpg", (img) => {
          img.set({
            left: object.position.left,
            top: object.position.top,
            scaleX: object.scale.width,
            scaleY: object.scale.height,
            angle: object.angle,
            fill: object.fill,
          });
          canvas.add(img);
        });
      } else if (object.type === "textbox") {
        const textbox = new fabric.Textbox("Your Text Here", {
          left: object.position.left,
          top: object.position.top,
          width: 200,
          fontSize: object.font.size,
          fontFamily: object.font.family,
          fontWeight: object.font.weight,
          angle: object.angle,
          textAlign: object.textAlign,
          fill: object.fill,
        });
        canvas.add(textbox);
      }
    });
  }, [objects]);

  return <canvas id="fabricCanvas" />;
};

export default FabricCanvas;
