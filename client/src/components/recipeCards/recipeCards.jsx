import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../../redux/actions/actions'
import RecipeCard from '../recipeCard/recipeCard'


function RecipeCards() {

    let dispatch = useDispatch()
    let recipes = useSelector(state => state.recipes)

    useEffect(() => {
        if (!recipes.length) {
            dispatch(getAllRecipes())
        }
    }, [recipes.length, dispatch])

    return (
        <div>
            {recipes.map(r => {
                return <RecipeCard
                    key={r.name}
                    name={r.name}
                    diets={r.diets}
                    img={r.image}
                    id={r.id}

                />
            })}
        </div>
    )
}

export default RecipeCards
