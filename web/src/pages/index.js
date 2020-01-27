import React from "react";
import { graphql } from "gatsby";

import Hero from "../components/hero";
import InfoRows from "../components/InfoRows";
import CTAColumns from "../components/cta-columns";
import CTA from "../components/cta";
import Pricing from "../components/pricing";
import { TopWave, BottomWave } from "../components/wave";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

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
    frontpage: sanityRoute(slug: { current: { eq: "frontpage" } }) {
      id
      slug {
        current
      }
      navMenu {
        items {
          title
          kind
          link
        }
      }
      page {
        _rawContent(resolveReferences: { maxDepth: 10 })
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
      description
      keywords
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const content = data.frontpage.page._rawContent
    .filter(c => !c.disabled)
    .map((c, i) => {
      let el = null;
      switch (c._type) {
        case "pricing":
          el = <Pricing key={c._key} {...c} />;
          break;
        case "infoRows":
          el = <InfoRows key={c._key} {...c} />;
          break;
        case "hero":
          el = <Hero key={c._key} {...c} />;
          break;
        case "ctaColumns":
          el = <CTAColumns key={c._key} {...c} />;
          break;
        case "ctaPlug":
          el = <CTA key={c._key} {...c} />;
          break;
        case "uiComponentRef":
          switch (c.name) {
            case "topWave":
              el = <TopWave />;
              break;
            case "bottomWave":
              el = <BottomWave />;
              break;
            default:
              break;
          }
          break;
        default:
          el = null;
      }
      return el;
    });

  const gradient = {
    from: (site.primaryColor && site.primaryColor.hex) || "#d53369",
    to: (site.secondaryColor && site.secondaryColor.hex) || "#daae51"
  };

  const navMenuItems = (data.frontpage.navMenu && data.frontpage.navMenu.items) || [];

  return (
    <Layout navMenuItems={navMenuItems}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        bodyAttr={{
          class: "leading-normal tracking-normal text-white gradient"
        }}
        gradient={gradient}
      />
      <div className="pt-24">{content}</div>
    </Layout>
  );
};

export default IndexPage;
