import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/landing/landing";
import Home from "./components/home/home";
import RecipeDetail from "./components/recipeDetail/recipeDetail.jsx";
import createRecipeComp from "./components/createRecipeComp/createRecipeComp";
import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./components/spinner/spinner";

function App() {
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
        <React.Fragment>
          <Route exact path="/" component={LandingPage} />

          <Route exact path="/home" component={Home} />

          <Route exact path="/createrecipe" component={createRecipeComp} />

          <Route exact path="/recipe/:id" component={RecipeDetail} />
        </React.Fragment>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default App;
