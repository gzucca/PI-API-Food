import React from "react";
import { Route } from "react-router-dom";
import LandingPage from './components/landing/landing';
import Home from './components/home/home';
import CreateRecipe from './components/createRecipe/createRecipe'
import './App.css'

function App() {
  return (
    <div>

      <React.Fragment>

        <Route exact path="/" component={LandingPage} />

        <Route exact path="/home" component={Home} />

        <Route exact path="/createrecipe" component={CreateRecipe} />
{/* 

        <Route path="/movie/:id" prop component={MovieDetail} />

          <Route path="/movies/create" component={CreateMovie} /> */}
        
      </React.Fragment>

    </div>
  );
}

export default App;
