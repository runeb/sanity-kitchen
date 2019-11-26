import React from "react";
import InstagramEmbed from "react-instagram-embed";

export default ({ node }) => {
  if (!node || !node.url) {
    return null;
  }
  return <InstagramEmbed url={node.url} />;
};
