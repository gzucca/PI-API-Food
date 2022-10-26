import React from "react";
import { Link } from "react-router-dom";
import './landing.css';


const LandingPage = () => {

    return (
        <div className="landingPage">

            <Link to={`/recipes/`}>
                <h1>A HOME</h1>
            </Link>
            
        </div>
    );
};

export default LandingPage;