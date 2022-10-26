const initialState = {
    recipes: [],
    // recipeDetail: {},
    // newRecipe: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_RECIPES':
            return {
            ...state,
            recipes: action.payload
        }

        // case GET_MOVIE_DETAILS:
        //     return {
        //     ...state,
        //     movieDetail: action.payload,
        // }

        // case CREATE_MOVIE:
        //     return {
        //     ...state,
        //     movies: [...state.movies, action.payload]
        // }

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