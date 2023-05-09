import React from "react";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import CreateRecipe from "./pages/CreateRecipe";
import Spinner from "./components/Spinner";
import "./App.css";

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
          <Route exact path="/" component={Landing} />

          <Route exact path="/home" component={Home} />

          <Route exact path="/createrecipe" component={CreateRecipe} />

          <Route exact path="/recipe/:id" component={RecipeDetail} />
        </React.Fragment>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default App;
