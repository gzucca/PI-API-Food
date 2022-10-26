import React from "react";
import { Route } from "react-router-dom";
import LandingPage from './components/landing/landing';
import Home from './components/home/home';
import './App.css';

function App() {
  return (
    <div>

      <React.Fragment>

        <Route exact path="/" component={LandingPage} />

        {/* <Route exact path="/recipes" component={Home} /> */}
{/* 
          <Nav />

          <Route path="/movie/:id" prop component={MovieDetail} />

          <Route path="/movies/create" component={CreateMovie} /> */}
        
      </React.Fragment>

    </div>
  );
}

export default App;
