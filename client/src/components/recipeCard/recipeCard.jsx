import React from 'react';
import { Link } from 'react-router-dom';
import './recipeCard.css';


function RecipeCard({ name, img, diets, id, healthScore }) {
    return (
        <div className='recipeCard' >
            <Link to={`/recipes/${id}`}><h2>{name}</h2></Link>
            <p>{healthScore}</p>
            <h4>
                {diets.map( e => {
                return `${e}, `})}
            
            </h4>
            <img height="400px" src={img} alt="imagen" />
        </div>
    )
}

export default RecipeCard