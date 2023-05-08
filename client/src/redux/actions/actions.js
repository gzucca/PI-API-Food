import axios from "axios";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const LOAD_ALL_RECIPES = "LOAD_ALL_RECIPES";
export const GET_RECIPES = "GET_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const FILTER_RECIPE_DIETS = "FILTER_RECIPE_DIETS";
export const SORT_RECIPES = "SORT_RECIPES";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:5000/";

export const getAllRecipes = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/recipes");
      return dispatch({ type: GET_ALL_RECIPES, payload: res.data });
    } catch (error) {
      alert("No se pudieron descargar recetas");
      console.log(error);
    }
  };
};

export const loadAllRecipes = (payload) => {
  return { type: LOAD_ALL_RECIPES, payload: payload };
};

export const getRecipes = (name) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/recipes?name=${name}`);
      return dispatch({ type: GET_RECIPES, payload: res.data });
    } catch (error) {
      alert("No se pudieron encontrar recetas para esa búsqueda.");
      console.log(error);
    }
  };
};

export const getAllDiets = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/diets");
      return dispatch({ type: GET_ALL_DIETS, payload: res.data });
    } catch (error) {
      alert("No se pudieron descargar las dietas");
      console.log(error);
    }
  };
};

export const getRecipeDetail = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/recipes/${id}`);
      return dispatch({ type: GET_RECIPE_DETAIL, payload: res.data });
    } catch (error) {
      alert("No se pudieron encontrar recetas con ese ID");
      console.log(error);
    }
  };
};

export const filterRecipeDiets = (payload) => {
  return { type: FILTER_RECIPE_DIETS, payload: payload };
};

export const cleanRecipeDetail = (payload) => {
  return { type: "CLEAN_RECIPE", payload: payload };
};

export const sortRecipes = (payload) => {
  return { type: SORT_RECIPES, payload: payload };
};

export const createRecipe = (payload) => {
  return async function () {
    try {
      const res = await axios.post("recipes", payload);
      return res;
    } catch (error) {
      alert("No se pudo crear la receta");
      console.log(error);
    }
  };
};
