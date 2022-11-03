import { FILTER_RECIPE_DIETS, GET_ALL_DIETS, GET_ALL_RECIPES, SORT_BY_NAME } from "../actions/actions";


const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    // recipeDetail: {},
    // newRecipe: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RECIPES:
            return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
        }

        case GET_ALL_DIETS:
            return {
            ...state,
            diets: action.payload,
        }

        case FILTER_RECIPE_DIETS:
            const allRecipes = state.allRecipes
            const dietsFiltered = allRecipes.filter(recip => recip.diets.includes(action.payload))
            return {
            ...state,
            recipes: dietsFiltered
        }

        case SORT_BY_NAME:
            const sortedRecipes = state.recipes.filter(recip => recip.diets.includes(action.payload))
            return {
            ...state,
            recipes: sortedRecipes
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