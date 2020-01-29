import React from "react";
import { graphql, Link } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
/*
import BlogPostPreviewGrid from "../components/blog-post-preview-grid";
import Container from "../components/container";
*/
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import clientConfig from "../../client-config";
import PortableText from "../components/portableText";

export const query = graphql`
  query BlogPageQuery {
    cover: file(relativePath: { eq: "cover.jpg" }) {
      childImageSharp {
        fixed(width: 960, height: 480) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          categories {
            title
          }
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
          authors {
            author {
              name
              image {
                ...SanityImage
              }
            }
          }
        }
      }
    }
  }
`;

const LeadBlogPost = ({
  categories,
  authors,
  _rawExcerpt,
  title,
  slug,
  mainImage,
  publishedAt
}) => {
  const mainImageFluid = getFluidGatsbyImage(
    mainImage.asset._id,
    { maxWidth: 960 },
    clientConfig.sanity
  );

  const authorImageFluid =
    authors &&
    authors.length &&
    getFluidGatsbyImage(authors[0].author.image.asset._id, { maxWidth: 150 }, clientConfig.sanity);

  const authorName = authors && authors.length && authors[0].author.name;

  const categoryTitle = categories && categories.length && categories[0].title;

  return (
    <div className="flex h-full bg-white rounded overflow-hidden shadow-lg">
      <Link to={`/blog/${slug.current}`} className="flex flex-wrap no-underline hover:no-underline">
        <div className="w-full md:w-2/3 rounded-t">
          <img src={mainImageFluid.src} className="h-full w-full shadow"></img>
        </div>

        <div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
            <p className="w-full text-gray-600 text-xs md:text-sm pt-6 px-6">
              {(categoryTitle || "").toUpperCase()}
            </p>
            <div className="w-full font-bold text-xl text-gray-900 px-6">{title}</div>
            <p className="text-gray-800 font-serif text-base px-6 mb-5">
              <PortableText blocks={_rawExcerpt} />
            </p>
          </div>

          <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
            <div className="flex items-center">
              {authorImageFluid ? (
                <img
                  className="w-8 h-8 rounded-full mr-4 avatar"
                  data-tippy-content="Author Name"
                  src={authorImageFluid.src}
                  alt="Avatar of Author"
                ></img>
              ) : (
                <span />
              )}
              <p className="text-gray-600 text-xs md:text-sm">{authorName}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const BlogPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);
  console.log("posts", postNodes);

  const style = {
    "background-image": `url("${data.cover.childImageSharp.fixed.src}")`,
    height: "60vh",
    "max-height": "460px"
  };

  const lead = postNodes[0];

  return (
    <Layout navMenuItems={[]}>
      <SEO
        title="Blog"
        bodyAttr={{
          class: "bg-gray-200 font-sans leading-normal tracking-normal"
        }}
      />
      <div className="w-full m-0 p-0 bg-cover bg-bottom" style={style}>
        <div className="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">
          {/* Title */}
          <p className="text-white font-extrabold text-3xl md:text-5xl">Blog</p>
        </div>
      </div>

      {/* Container */}
      <div className="container px-4 md:px-0 max-w-6xl mx-auto -mt-32">
        <div className="mx-0 sm:mx-6">
          <div className="bg-gray-200 w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
            {/* Lead Card */}
            {lead && <LeadBlogPost {...lead} />}
            {/* /Lead Card */}

            {/* Posts Container */}
            <div className="flex flex-wrap justify-between pt-12 -mx-6">
              {/* 1/3 col  */}
              <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                  <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                    <img
                      src="https://source.unsplash.com/collection/225/800x600"
                      className="h-64 w-full rounded-t pb-6"
                    ></img>
                    <p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">
                      Lorem ipsum dolor sit amet.
                    </div>
                    <p className="text-gray-800 font-serif text-base px-6 mb-5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu
                      nunc commodo posuere et sit amet ligula.
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <img
                      className="w-8 h-8 rounded-full mr-4 avatar"
                      data-tippy-content="Author Name"
                      src="http://i.pravatar.cc/300"
                      alt="Avatar of Author"
                    ></img>
                    <p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
                  </div>
                </div>
              </div>

              {/* 1/3 col  */}
              <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                  <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                    <img
                      src="https://source.unsplash.com/collection/3106804/800x600"
                      className="h-64 w-full rounded-t pb-6"
                    ></img>
                    <p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">
                      Lorem ipsum dolor sit amet.
                    </div>
                    <p className="text-gray-800 font-serif text-base px-6 mb-5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. ipsum dolor sit amet,
                      consectetur adipiscing elit. Aliquam at ip Aliquam at ipsum eu nunc commodo
                      posuere et sit amet ligula.
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <img
                      className="w-8 h-8 rounded-full mr-4 avatar"
                      data-tippy-content="Author Name"
                      src="http://i.pravatar.cc/300"
                      alt="Avatar of Author"
                    ></img>
                    <p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
                  </div>
                </div>
              </div>

              {/* 1/3 col  */}
              <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                  <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                    <img
                      src="https://source.unsplash.com/collection/539527/800x600"
                      className="h-64 w-full rounded-t pb-6"
                    ></img>
                    <p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
                    <div className="w-full  font-bold text-xl text-gray-900 px-6">
                      Lorem ipsum dolor sit amet.
                    </div>
                    <p className="text-gray-800 font-serif text-base px-6 mb-5">
                      Lorem ipsum eu nunc commodo posuere et sit amet ligula.
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <img
                      className="w-8 h-8 rounded-full mr-4 avatar"
                      data-tippy-content="Author Name"
                      src="http://i.pravatar.cc/300"
                      alt="Avatar of Author"
                    ></img>
                    <p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
                  </div>
                </div>
              </div>

              {/* 1/2 col  */}
              <div className="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                  <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                    <img
                      src="https://source.unsplash.com/collection/3657445/800x600"
                      className="h-full w-full rounded-t pb-6"
                    ></img>
                    <p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">
                      Lorem ipsum dolor sit amet.
                    </div>
                    <p className="text-gray-800 font-serif text-base px-6 mb-5">
                      Lorem ipsum eu nunc commodo posuere et sit amet ligula.
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <img
                      className="w-8 h-8 rounded-full mr-4 avatar"
                      data-tippy-content="Author Name"
                      src="http://i.pravatar.cc/300"
                      alt="Avatar of Author"
                    ></img>
                    <p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
                  </div>
                </div>
              </div>

              {/* 1/2 col  */}
              <div className="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 flex-row bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                  <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                    <img
                      src="https://source.unsplash.com/collection/764827/800x600"
                      className="h-full w-full rounded-t pb-6"
                    ></img>
                    <p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">
                      Lorem ipsum dolor sit amet.
                    </div>
                    <p className="text-gray-800 font-serif text-base px-6 mb-5">
                      Lorem ipsum eu nunc commodo posuere et sit amet ligula.
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <img
                      className="w-8 h-8 rounded-full mr-4 avatar"
                      data-tippy-content="Author Name"
                      src="http://i.pravatar.cc/300"
                      alt="Avatar of Author"
                    ></img>
                    <p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
                  </div>
                </div>
              </div>

              {/* 2/3 col  */}
              <div className="w-full md:w-2/3 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                  <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                    <img
                      src="https://source.unsplash.com/collection/325867/800x600"
                      className="h-full w-full rounded-t pb-6"
                    ></img>
                    <p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">
                      Lorem ipsum dolor sit amet.
                    </div>
                    <p className="text-gray-800 font-serif text-base px-6 mb-5">
                      Lorem ipsum eu nunc commodo posuere et sit amet ligula.
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <img
                      className="w-8 h-8 rounded-full mr-4 avatar"
                      data-tippy-content="Author Name"
                      src="http://i.pravatar.cc/300"
                      alt="Avatar of Author"
                    ></img>
                    <p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
                  </div>
                </div>
              </div>

              {/* 1/3 col  */}
              <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                  <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                    <img
                      src="https://source.unsplash.com/collection/1118905/800x600"
                      className="h-full w-full rounded-t pb-6"
                    ></img>
                    <p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">
                      Lorem ipsum dolor sit amet.
                    </div>
                    <p className="text-gray-800 font-serif text-base px-6 mb-5">
                      Lorem ipsum eu nunc commodo posuere et sit amet ligula.
                    </p>
                  </a>
                </div>
                <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <img
                      className="w-8 h-8 rounded-full mr-4 avatar"
                      data-tippy-content="Author Name"
                      src="http://i.pravatar.cc/300"
                      alt="Avatar of Author"
                    ></img>
                    <p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>
                  </div>
                </div>
              </div>
            </div>
            {/* / Post Content */}
          </div>

          {/* Subscribe */}
          <div className="container font-sans bg-teal-100 rounded mt-8 p-4 md:p-24 text-center">
            <h2 className="font-bold break-normal text-2xl md:text-4xl">
              Subscribe to Ghostwind CSS
            </h2>
            <h3 className="font-bold break-normal font-normal text-gray-600 text-base md:text-xl">
              Get the latest posts delivered right to your inbox
            </h3>
            <div className="w-full text-center pt-4">
              <form action="#">
                <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                  <input
                    type="email"
                    placeholder="youremail@example.com"
                    className="flex-1 appearance-none rounded shadow p-3 text-gray-600 mr-2 focus:outline-none"
                  ></input>
                  <button
                    type="submit"
                    className="flex-1 mt-4 md:mt-0 block md:inline-block appearance-none bg-teal-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-teal-400"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/*  /Subscribe */}

          {/* Author */}
          <div className="flex w-full items-center font-sans p-8 md:p-24">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="http://i.pravatar.cc/300"
              alt="Avatar of Author"
            ></img>
            <div className="flex-1">
              <p className="text-base font-bold text-base md:text-xl leading-none">Ghostwind CSS</p>
              <p className="text-gray-600 text-xs md:text-base">
                Tailwind CSS version of Ghost's Casper theme by{" "}
                <a
                  className="text-gray-800 hover:text-teal-500 no-underline border-b-2 border-teal-500"
                  href="https://www.tailwindtoolbox.com"
                >
                  TailwindToolbox.com
                </a>
              </p>
            </div>
            <div className="justify-end">
              <button className="bg-transparent border border-gray-500 hover:border-teal-500 text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4 rounded-full">
                Read More
              </button>
            </div>
          </div>
          {/* /Author */}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
