import { ChangeEvent, useState } from "react";

import { BACKGROUND_LIST } from "../../utils/storyBackgroundList";

// import classes from "./textStory.module.css";

const TextStory = () => {
  const [text, setText] = useState("");
  const [background, setBackground] = useState("#000");

  const onChangeText = (e) => {
    const text = e.target.value;
    setText(text);
  };

  const saveToServer = () => {
    const data = {
      type: "text",
      background,
      text,
    };
    localStorage.setItem("data", JSON.stringify(data));
  };

  return (
    <div className={"root"}>
      <aside className={"aside"}>
        <textarea className={"textarea"} onChange={onChangeText} rows={7} />
        <p>Change color</p>
        <ul className={"backgroundList"}>
          {BACKGROUND_LIST.map((color) => {
            return (
              <li
                onClick={() => setBackground(color)}
                style={{
                  background: color,
                  cursor: "pointer",
                  outline: `${color === background ? "2px solid blue" : ""} `,
                }}
              ></li>
            );
          })}
        </ul>
        <button onClick={saveToServer}>Save</button>
      </aside>
      <div
        className={"main"}
        style={{
          background: background,
        }}
      >
        <p className={"text"}>{text}</p>
      </div>
    </div>
  );
};

export default TextStory;
