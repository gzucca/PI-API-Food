
export const getAllRecipes = () => { 
    return function (dispatch) {
        return fetch("http://localhost:3001/recipes")
        .then(res => res.json())
        .then(data => dispatch({ type: 'GET_ALL_RECIPES', payload: data }))
    }
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