import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

export default function RecipeCard({ name, img, diets, id, dishTypes }) {
  let dietsNewArray = (diets) => {
    let newArray = [];
    for (let i = 0; i < diets.length; i++) {
      let diet = diets[i];
      let dietUpper = diet.name.charAt(0).toUpperCase() + diet.name.slice(1);
      newArray.push(dietUpper);
      if (i + 1 < diets.length) {
        newArray.push(", ");
      }
    }
    newArray.push(".");
    return newArray;
  };

  let dishTypesNewArray = (dishTypes) => {
    let newArray = [];
    for (let i = 0; i < dishTypes.length; i++) {
      let dishType = dishTypes[i];
      if (i === 0) {
        let dishTypeUpper =
          dishType.charAt(0).toUpperCase() + dishType.slice(1);
        newArray.push(dishTypeUpper);
      }
      if (i !== 0) {
        newArray.push(dishType);
      }
      if (i + 1 < dishTypes.length) {
        newArray.push(", ");
      }
    }
    newArray.push(".");
    return newArray;
  };

  return (
    <div className="recipeCard">
      <Link className="header" to={`/recipe/${id}`}>
        <h2>{name}</h2>
      </Link>
      <h4>
        {dietsNewArray(diets).map((e) => {
          return e;
        })}
      </h4>

      {dishTypes.length && (
        <h5>
          {" "}
          {dishTypesNewArray(dishTypes).map((e) => {
            return e;
          })}{" "}
        </h5>
      )}

      <div className="ImageContainer">
        <Link  to={`/recipe/${id}`}>
          <img loading="lazy" height="400px" src={img} alt="imagen" />
        </Link>
      </div>
    </div>
  );
}