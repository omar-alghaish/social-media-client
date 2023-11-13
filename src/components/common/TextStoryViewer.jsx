const TextStoryViewer = ({ data }) => {
  const { background, text } = data;
  return (
    <div
      className={"root-text-veiwer"}
      style={{
        background: `${background}`,
      }}
    >
      <div className={"text-veiwer"}>{text}</div>
    </div>
  );
};

export default TextStoryViewer;
