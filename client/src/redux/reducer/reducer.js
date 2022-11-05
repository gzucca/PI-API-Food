import { FILTER_RECIPE_DIETS, GET_ALL_DIETS, GET_ALL_RECIPES, GET_RECIPES, SORT_RECIPES, CREATE_RECIPE } from "../actions/actions";


const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],

};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RECIPES:
            return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
        }

        case GET_RECIPES:
            return {
            ...state,
            recipes: action.payload,
        }

        case GET_ALL_DIETS:
            return {
            ...state,
            diets: action.payload,
        }

        case FILTER_RECIPE_DIETS:
            let allRecipes = state.allRecipes
            let recipesFiltered = []
            if (action.payload !== 'allDiets') {
                for (let i = 0; i < allRecipes.length; i++) {
                    const recipe = allRecipes[i];
                    if (recipe.diets.filter(diet => diet.name === action.payload).length > 0){
                        recipesFiltered.push(recipe)
                    }
                }
            } else {
                recipesFiltered = allRecipes
            }
            return {
            ...state,
            recipes: recipesFiltered
        }

        case SORT_RECIPES:
            const sortedRecipes = state.recipes
            if (action.payload === 'alphaUp') {
                sortedRecipes.sort((a, b) => a.name.localeCompare(b.name))
            }

            if (action.payload === 'alphaDown') {
                sortedRecipes.sort((a, b) => b.name.localeCompare(a.name))
            }

            if (action.payload === 'hScoreUp') {
                sortedRecipes.sort((a, b) => a.healthScore - b.healthScore )
            }

            if (action.payload === 'hScoreDown') {
                sortedRecipes.sort((a, b) => b.healthScore - a.healthScore )
            }

            return {
            ...state,
            recipes: sortedRecipes
        }

        case CREATE_RECIPE:
            return {
            ...state,
        }
        

        // case DELETE_MOVIE:
        //     return {
        //     ...state,
        //     movies: state.movies.filter(film => film.id !== action.payload)
        // }
    
        // case SEND_EMAIL:
        //     return {
        //     ...state,
        //     email: action.payload
        // }

        default:
            return { 
            ...state 
        } 
    }
};


export default rootReducer;