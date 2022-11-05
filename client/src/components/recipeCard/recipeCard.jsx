import React from 'react';
import { Link } from 'react-router-dom';
import './recipeCard.css';


function RecipeCard({ name, img, diets, id, healthScore }) {

    let dietsNewArray = (diets) => {
        let newArray = []
        for (let i = 0; i < diets.length; i++) {
            let diet = diets[i];
            let dietUpper = diet.name.charAt(0).toUpperCase() + diet.name.slice(1)
            newArray.push(dietUpper)
            if (i+1 < diets.length){
            newArray.push(', ')}
            }   
            newArray.push('.')
        return newArray
    }


    return (
        <div className='recipeCard' >
            <Link to={`/recipes/${id}`}><h2>{name}</h2></Link>
            <h4>
                {dietsNewArray(diets).map(e => {
                return e})}
            </h4>
            <img height="400px" src={img} alt="imagen" />
        </div>
    )
}

export default RecipeCard