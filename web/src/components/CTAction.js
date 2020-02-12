import React from "react";
import { Link } from "gatsby";

const CTAction = ({ kind, title, link }) => (
  <div className="flex-1 text-gray-700 text-center py-2">
    {kind === "button" && (
      <button className="mx-auto ml-4 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
        {title}
      </button>
    )}
    {kind === "link" && <Link to={link}>{title}</Link>}
  </div>
);

export default CTAction;
