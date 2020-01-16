import React from "react";
import PortableText from "./portableText";
import Img from "gatsby-image";
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import clientConfig from "../../client-config";

function Hero(props) {
  let img = null;
  if (props.illustration && props.illustration.disabled !== true && props.illustration.image) {
    const fluidProps = getFluidGatsbyImage(
      props.illustration.image.asset._id,
      { maxWidth: 960 },
      clientConfig.sanity
    );

    img = (
      <img
        className="w-full md:w-4/5 z-50"
        src={fluidProps.src}
        alt={props.illustration.image.alt}
      />
    );
  }

  return (
    <div className="pt-24">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        {/* Left col */}
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-loose w-full">{props.label}</p>
          <h1 className="my-4 text-5xl font-bold leading-tight">{props.heading}</h1>
          <p className="leading-normal text-2xl mb-8">
            <PortableText blocks={props.tagline} />
          </p>

          {props.cta && props.cta.title && (
            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
              {props.cta.title}
            </button>
          )}
        </div>
        {/* Right col */}
        <div className="w-full md:w-3/5 py-6 text-center">{img}</div>
      </div>
    </div>
  );
}

export default Hero;
