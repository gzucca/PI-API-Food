import React from "react";
import { Link } from "react-router-dom";
import Background from "../../assets/clientBackground.webp";
import BackgroundMobile from "../../assets/clientBackgroundMobile.webp";
import "./Landing.css";

export default function Landing() {
  return (
    <main className="background">
      <picture>
        <source media="(max-width:800px)" srcset={BackgroundMobile} />
        <img
          className="background-image"
          loading="eager"
          src={Background}
          alt="Background"
        />
      </picture>
      <section className="landing">
        <h1 className="landing-title">API FOOD</h1>
        <h2 className="landing-subtitle">by Gonzalo Zucca</h2>
        <Link to={`/home/`}>
          <button className="landing-btn">HOME</button>
        </Link>
      </section>
    </main>
  );
}
