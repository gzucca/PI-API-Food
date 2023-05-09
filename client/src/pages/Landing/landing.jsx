import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

export default function Landing() {
  return (
    <div className="landingPage">
      <Link to={`/home/`}>
        <h1>HOME</h1>
      </Link>
    </div>
  );
};

