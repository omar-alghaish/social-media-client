import React from "react";

const TextWithTags = ({ text }) => {
  const hashtagRegex = /\B#\w\w+\b/g;
  const mentionRegex = /\B@\w+/g;

  const extractTags = (text, regex) => {
    return text.match(regex) || [];
  };

  const renderTextWithLinks = () => {
    let modifiedText = text;

    const hashtags = extractTags(text, hashtagRegex);
    const mentions = extractTags(text, mentionRegex);

    hashtags.forEach((tag) => {
      modifiedText = modifiedText.replace(
        tag,
        `<a class="hashtag" href="/posts/tags/${tag.substr(1)}">${tag}</a>`
      );
    });

    mentions.forEach((mention) => {
      const userId = mention.substr(1);
      modifiedText = modifiedText.replace(
        mention,
        `<a class="mention" href="/users/${userId}">${mention}</a>`
      );
    });

    return (
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: modifiedText }}
      />
    );
  };

  return <div className="text">{renderTextWithLinks()}</div>;
};

export default TextWithTags;
