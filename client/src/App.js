import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/landing/landing";
import Home from "./components/home/home";
import RecipeDetail from "./components/recipeDetail/recipeDetail.jsx";
import createRecipeComp from "./components/createRecipeComp/createRecipeComp";
import "./App.css";

function App() {
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
