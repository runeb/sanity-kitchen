import React from "react";
import { graphql } from "gatsby";

import Errors from "../components/errors";

import Page from "../templates/page";

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    route: sanityRoute(slug: { current: { eq: "frontpage" } }) {
      id
      slug {
        current
      }
      useSiteTitle
      page {
        title
        _rawContent(resolveReferences: { maxDepth: 10 })
      }
      navMenu {
        _rawItems(resolveReferences: { maxDepth: 10 })
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      primaryColor {
        hex
      }
      secondaryColor {
        hex
      }
      title
      openGraph {
        title
        description
        image {
          ...SanityImage
        }
      }
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  return <Page data={data} />;
};

export default IndexPage;
