require('dotenv').config();
const axios = require('axios');
const {Recipe, Diet} = require('../db');
const {API_KEY} = process.env;
const myJson = require ("../../complexSearch.json");

//traemos todas las recetas de la API


const getRecipesFromApi =  () => {
    // const recipesFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=true&addRecipeInformation=true`)
    const recipesFromApi = myJson
    
    // const dataRecipesApi = recipesFromApi.data.results;
    const dataRecipesApi = recipesFromApi.results;

    const resultadosApi = dataRecipesApi.map((recip) => {
        return {
            id: recip.id,
            name: recip.title,
            summary: recip.summary,
            healthScore: recip.healthScore,
            // steps: recip.steps.map(step => return step)
        }
    })


    return resultadosApi;
};


const getRecipesFromDB = async () => {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};

// const getRecipesFromDB = async () => {
//     const recipes = await Recipe.create({
//         id,
//         name: 'rice',
//         summary: 'una sopita',
//         healthScore: 5,
//         steps: 'paso 1 paso 2',
//         image: 'imagen',
//         createdRecipe: true,
//     });
//     if(recipes.length === 0){
//         return 'No se encontró nada'
//     }
//     return recipes

// };

const getAllRecipes = async () => {
    const recipesFromApi = await getRecipesFromApi();
    const recipesFromDB = await getRecipesFromDB();
    const allRecipes = recipesFromApi.concat(recipesFromDB);
    return allRecipes

};


// const getRecipeDetailFromApi = async (id) => {
//     const RecipeDetailFromApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_key}&includeNutrition=true.`)
//     console.log('Respuesta api:', RecipesFromApi);
//     const dataRecipeDetailApi = dataRecipeDetailApi.data;
//     //console.log('recorte api', dataRecipesApi);
//     const data = dataRecipeDetailApi.map(recip => {
//         return {
//             id: recip.id,
//             name: recip.name,
//             dishTypes: recip.dishTypes.map(dish => dish),
//             diets: recip.diets.map(diet => diet),
//             summary: recip.summary,
//             healthScore: recip.healthScore,
//             steps: recip.steps.map(step => step),
//             image: recip.image
//         }
//     })
//     //console.log('soy la nueva data recortada', data);
//     return data;
// };

module.exports = {
    getRecipesFromApi,
    getRecipesFromDB,
    getAllRecipes,
}