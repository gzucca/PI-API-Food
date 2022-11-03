import React from 'react'
import { Link } from 'react-router-dom'


function RecipeCard({ name, img, diets, id, healthScore }) {
    return (
        <div >
            <Link to={`/recipes/${id}`}><p>{name}</p></Link>
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