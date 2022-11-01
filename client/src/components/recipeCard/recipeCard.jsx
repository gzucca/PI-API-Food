import React from 'react'
import { Link } from 'react-router-dom'


function RecipeCard({ name, img, diets, id }) {
    return (
        <div >
            <Link to={`/recipes/${id}`}><p>{name}</p></Link>
            <h4>
                {diets.map( e => {
                return `${e}, `})}
            
            </h4>
            <img height="400px" src={img} alt="imagen" />
        </div>
    )
}

export default RecipeCard