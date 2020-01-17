import React from "react";
import PortableText from "../components/portableText";
import { ctaColumns } from "../../../studio/schemas/plugs";

const CTA = ({ label, title, body, ctas }) => (
  <section className="container mx-auto text-center py-6 mb-12">
    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">{title}</h1>
    <div className="w-full mb-4">
      <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
    </div>

    <p className="my-4 text-3xl leading-tight">
      <PortableText blocks={body} />
    </p>

    <div class="flex">
      {ctas.map(c => {
        return (
          <div class="flex-1 text-gray-700 text-center px-4 py-2 m-2">
            <button className="mx-auto ml-4 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
              {c.title}
            </button>
          </div>
        );
      })}
    </div>
  </section>
);

export default CTA;
