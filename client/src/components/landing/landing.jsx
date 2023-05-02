import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner";
import { useEffect, useState } from "react";
import "./landing.css";

const LandingPage = () => {
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    const onPageLoad = () => {
      setPlayAnimation(true);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
    }
    return () => window.removeEventListener("load", onPageLoad);
  }, []);

  return (
    <>
      {playAnimation ? (
        <div className="landingPage">
          <Link to={`/home/`}>
            <h1>HOME</h1>
          </Link>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default LandingPage;
