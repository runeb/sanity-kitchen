import { format, distanceInWords, differenceInDays } from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import PortableText from "./portableText";

const BlogPost = props => {
  const { _rawBody, authors, categories, title, mainImage, publishedAt } = props;
  const imgUrl =
    mainImage &&
    imageUrlFor(buildImageObj(mainImage))
      .width(1200)
      .height(Math.floor((9 / 16) * 1200))
      .fit("crop")
      .auto("format")
      .url();

  console.log("date");
  return (
    <div class="text-center pt-16 md:pt-32">
      <p class="text-sm md:text-base text-teal-500 font-bold">
        {format(publishedAt, "d MMMM yyyy").toUpperCase()} <span class="text-gray-900">/</span>{" "}
        GETTING STARTED
      </p>
      <h1 class="font-bold break-normal text-3xl md:text-5xl">{title}</h1>
    </div>
  );
};

export default BlogPost;
