import { format, distanceInWords, differenceInDays } from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import PortableText from "./portableText";
import Container from "./container";
import AuthorList from "./author-list";

import styles from "./blog-post.module.css";

function BlogPost(props) {
  const { _rawBody, authors, categories, title, mainImage, publishedAt } = props;
  const imgUrl =
    mainImage &&
    imageUrlFor(buildImageObj(mainImage))
      .width(1200)
      .height(Math.floor((9 / 16) * 1200))
      .fit("crop")
      .auto("format")
      .url();

  return (
    <div className="container w-full mx-auto pt-24 p-8">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <div className="font-sans">
          <span className="text-base md:text-sm text-teal-500 font-bold">
            &lt;
            <Link
              to="/blog"
              className="text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
            >
              BACK TO BLOG
            </Link>
          </span>
          <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
            {title}
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600">Published {publishedAt}</p>
        </div>
        <PortableText blocks={_rawBody} />
      </div>

      <div className="text-base md:text-sm text-gray-500 px-4 py-6">
        Tags:{" "}
        <a href="#" className="text-base md:text-sm text-teal-500 no-underline hover:underline">
          Link
        </a>{" "}
        .{" "}
        <a href="#" className="text-base md:text-sm text-teal-500 no-underline hover:underline">
          Link
        </a>
      </div>

      <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

      <div className="font-sans flex justify-between content-center px-4 pb-12">
        <div className="text-left">
          <span className="text-xs md:text-sm font-normal text-gray-600">&lt; Previous Post</span>
          <br />
          <p>
            <a
              href="#"
              className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
            >
              Blog title
            </a>
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs md:text-sm font-normal text-gray-600">Next Post &gt;</span>
          <br />
          <p>
            <a
              href="#"
              className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
            >
              Blog title
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
