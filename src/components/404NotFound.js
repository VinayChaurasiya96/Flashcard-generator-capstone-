import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Page not found</p>
      <span className="relative block px-8 py-3 bg-[#1A2238] border rounded-md border-current text-white">
        <Link to="/">Go Home</Link>
      </span>
    </div>
  );
};

export default NotFound;
