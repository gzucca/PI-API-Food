import { FILTER_RECIPE_DIETS, GET_ALL_DIETS, GET_ALL_RECIPES } from "../actions/actions";


const initialState = {
    recipes: [],
    diets: [],
    // recipeDetail: {},
    // newRecipe: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RECIPES:
            return {
            ...state,
            recipes: action.payload
        }

        case GET_ALL_DIETS:
            return {
            ...state,
            diets: action.payload,
        }

        case FILTER_RECIPE_DIETS:
            return {
            ...state,
            recipes: state.recipes.filter(recip => recip.diets.includes(action.payload))
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