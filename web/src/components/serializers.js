import React from "react";
import Figure from "./Figure";
import Instagram from "./Instagram";

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    instagram: Instagram
  }
};

export default serializers;
