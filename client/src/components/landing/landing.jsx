import React from "react";
import { Link } from "react-router-dom";

import "./landing.css";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <Link to={`/home/`}>
        <h1>HOME</h1>
      </Link>
    </div>
  );
};

export default LandingPage;
