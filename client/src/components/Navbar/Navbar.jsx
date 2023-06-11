import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../../redux/actions";
import "./Navbar.css";

export default function NavBar() {
  const [recipeState, setRecipeState] = useState({
    name: "",
  });

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipes(recipeState.name));
    setRecipeState({
      name: "",
    });
  }

  const handleInputChange = function (e) {
    setRecipeState({
      name: e.target.value.toLowerCase(),
    });
  };

  return (
    <div className="navBar-container">
      <h1>Home</h1>
      <div className="navBar">
        <Link className="navBar__createRecipe" to="/createRecipe">Create recipe</Link>

        <form className="navBar__form" onSubmit={handleSubmit}>
          <label>Search:</label>
          <input
            type="text"
            placeholder="Recipe name"
            autoComplete="off"
            value={recipeState.name}
            onChange={handleInputChange}
          />
          <button type="submit" className="navBar__form__button">
            🔎
          </button>
        </form>
      </div>
    </div>
  );
}
