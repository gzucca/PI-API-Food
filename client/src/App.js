import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Spinner from "./components/spinner/spinner";
import LandingPage from "./components/landing/landing";
import Home from "./components/home/home";
import RecipeDetail from "./components/recipeDetail/recipeDetail.jsx";
import createRecipeComp from "./components/createRecipeComp/createRecipeComp";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <React.Fragment>
        <Route exact path="/" component={LandingPage} />

        <Route exact path="/home" component={Home} />

        <Route exact path="/createrecipe" component={createRecipeComp} />

        <Route exact path="/recipe/:id" component={RecipeDetail} />
      </React.Fragment>
    </div>
  );
}

export default App;
