import axios from 'axios';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';

export const GET_RECIPES = 'GET_RECIPES';

export const GET_ALL_DIETS = 'GET_ALL_DIETS';

export const FILTER_RECIPE_DIETS = 'FILTER_RECIPE_DIETS';

export const SORT_RECIPES = 'SORT_RECIPES';

export const CREATE_RECIPE = 'CREATE_RECIPE';

export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';



export const getAllRecipes = () => { 
    
    return async function (dispatch) {
            try {
            return await fetch("http://localhost:3001/recipes")
            .then(res => res.json())
            .then(data => dispatch({ type: GET_ALL_RECIPES, payload: data }))
        } catch (error) {
            alert ('No se pudieron descargar recetas')
            console.log(error)
        }
    }
};

export const getRecipes = (name) => { 
    
    return async function (dispatch) {
            try {
            if (name) {
                return await fetch(`http://localhost:3001/recipes?name=${name}`)
                .then(res => res.json())
                .then(data => dispatch({ type: GET_RECIPES, payload: data }))}
        } catch (error) {
            alert ('No se pudieron encontrar recetas para esa búsqueda')
            console.log(error)
        }
        
    }
};

export const getAllDiets = () => { 
    return async function (dispatch) {
            try {
            return await fetch("http://localhost:3001/diets")
            .then(res => res.json())
            .then(data => dispatch({ type: GET_ALL_DIETS, payload: data }))

            } catch (error) {
            alert ('No se pudieron descargar las dietas')
            console.log(error)
        }
    }
};

export const getRecipeDetail = (id) => { 
    return async function(dispatch) {
        try {
            return await fetch(`http://localhost:3001/recipes/${id}`)
            .then(res => res.json())
            .then(data => dispatch({ type: GET_RECIPE_DETAIL, payload: data }))
        } catch (error) {
            alert('No se pudieron encontrar recetas con ese ID')
            console.log(error)
        }  
    }
}


export const filterRecipeDiets = (payload) => { 
    return { type: FILTER_RECIPE_DIETS, payload: payload }
};

export const sortRecipes = (payload) => { 
    return { type: SORT_RECIPES, payload: payload }
};

export const createRecipe = (payload) => { 
    return async function () { 
    try {
        const res = await axios.post('http://localhost:3001/recipes', payload);
        return res;
    } catch (error) {
        alert('No se pudo crear la receta')
        console.log(error)}  
    }
}
