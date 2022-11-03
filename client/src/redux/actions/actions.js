
export const GET_ALL_RECIPES = 'GELL_ALL_RECIPES';

export const GET_ALL_DIETS = 'GET_ALL_DIETS';

export const FILTER_RECIPE_DIETS = 'FILTER_RECIPE_DIETS';

export const SORT_RECIPES = 'SORT_RECIPES';



export const getAllRecipes = (name) => { 
    return function (dispatch) {
        if (name) {
            return fetch(`http://localhost:3001/recipes?name=${name}`)
            .then(res => res.json())
            .then(data => dispatch({ type: GET_ALL_RECIPES, payload: data }))}
        else {
        return fetch("http://localhost:3001/recipes")
        .then(res => res.json())
        .then(data => dispatch({ type: GET_ALL_RECIPES, payload: data }))}
    }
};


export const getAllDiets = () => { 
    return function (dispatch) {
        return fetch("http://localhost:3001/diets")
        .then(res => res.json())
        .then(data => dispatch({ type: GET_ALL_DIETS, payload: data }))}
    
};

export const filterRecipeDiets = (payload) => { 
    return { type: FILTER_RECIPE_DIETS, payload: payload }
};

export const sortRecipes = (payload) => { 
    return { type: SORT_RECIPES, payload: payload }
};

// export const getMovieDetail = (id) => { 
//     return function (dispatch) {
//         return fetch(`http://localhost:3001/movies/${id}`)
//         .then(res => res.json())
//         .then(data => dispatch({ type: GET_MOVIE_DETAILS, payload: data}))
//     }
// };

// let id = 5
// export const createMovie = (payload) => {
//     id++;
//     return { type: CREATE_MOVIE, payload: {...payload, id: id} }
// };


// // Desde el componente ejecutamos la action creator, pasandole como argumento el id de la movie que queremos eliminar.
// export const deleteMovie = (id) => { 
//     return { type: DELETE_MOVIE, payload: id} 
// };

// // Desde el componente ejecutamos la action creator, pasandole como argumento los values que vamos a utilizar para enviar el form de contacto.
// export const sendEmail = (payload) => {
//     return { type: SEND_EMAIL, payload: payload}
// };