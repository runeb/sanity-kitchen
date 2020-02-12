import React from "react";
import PortableText from "../components/portableText";
import CTAction from "./CTAction";

const CTA = ({ label, title, body, ctas }) => (
  <section className="container mx-auto text-center py-6 mb-12">
    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">{title}</h1>
    <div className="w-full mb-4">
      <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
    </div>

    <p className="my-4 text-3xl leading-tight">
      <PortableText blocks={body} />
    </p>

    <div className="flex">
      {ctas.map((c, i) => (
        <CTAction {...c} key={`cta_${i}`} />
      ))}
    </div>
  </section>
);

export default CTA;
