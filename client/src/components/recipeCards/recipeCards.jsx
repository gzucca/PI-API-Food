import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../../redux/actions/actions'
import RecipeCard from '../recipeCard/recipeCard'
import Paginado from "../paginado/paginado";


function RecipeCards({alphabeticallySort, healthScoreSort}) {

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(6);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = recipes.slice(indexOfFirstCard, indexOfLastCard);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    

    const handleSort = function (array) {


        if (alphabeticallySort === true) {
            array.sort((a, b) => a.name.localeCompare(b.name))
        }

        if (alphabeticallySort === false) {
            array.sort((a, b) => b.name.localeCompare(a.name))
        }


        if (healthScoreSort === true) {
            array.sort((a, b) => a.healthScore - b.healthScore )
        }

        if (healthScoreSort === false) {
            array.sort((a, b) => b.healthScore - a.healthScore )
        }


        return array
    };

    useEffect(() => {
        if (!recipes.length) {
            dispatch(getAllRecipes())
        }
    }, [recipes.length, dispatch], [healthScoreSort] );

    return (
        <div>
            {handleSort(currentCards).map(r => {
                return <RecipeCard
                    key={r.name}
                    name={r.name}
                    diets={r.diets}
                    img={r.image}
                    id={r.id}
                    healthScore={r.healthScore}
                />
            })}
            {/* <Paginado cardsPerPage={cardsPerPage} recipes={recipes.length} paginado={paginado}/> */}
        </div>
    )
}

// export default RecipeCards
