import React from "react";
import Figure from "./Figure";
import Instagram from "./Instagram";
import YouTube from "./YouTube";

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    instagram: Instagram,
    youtube: YouTube
  }
};

export default serializers;
