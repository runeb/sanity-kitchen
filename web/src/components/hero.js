import React from "react";
import PortableText from "./portableText";
import Img from "gatsby-image";
import clientConfig from "../../client-config";
import CTAction from "./CTAction";

import { getFluidGatsbyImage } from "gatsby-source-sanity";
const maybeImage = illustration => {
  let img = null;
  if (illustration && illustration.image && illustration.image.asset && !illustration.disabled) {
    const fluidProps = getFluidGatsbyImage(
      illustration.image.asset._id,
      { maxWidth: 960 },
      clientConfig.sanity
    );

    img = (
      <img className="w-full md:w-4/5 z-50" src={fluidProps.src} alt={illustration.image.alt} />
    );
  }
  return img;
};

function Hero(props) {
  const img = maybeImage(props.illustration);
  return (
    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      {/* Left col */}
      <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
        <p className="uppercase tracking-loose w-full">{props.label}</p>
        <h1 className="my-4 text-5xl font-bold leading-tight">{props.heading}</h1>
        <div className="leading-normal text-2xl mb-8">
          <PortableText blocks={props.tagline} />
        </div>
        {props.cta && props.cta.title && <CTAction {...props.cta} />}
      </div>
      {/* Right col */}
      <div className="w-full md:w-3/5 py-6 text-center">{img}</div>
    </div>
  );
}

export default Hero;
