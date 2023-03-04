require('dotenv').config();
const axios = require('axios');
const {Recipe, Diet} = require('../db');
const {API_KEY} = process.env;
const myJson = require ("../../complexSearch2.json");

//traemos todas las recetas de la API


const getRecipesFromApi = async () => {
    try {
     const recipesFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=false&addRecipeInformation=true&number=100`)
    //const recipesFromApi = myJson
    const dataRecipesApi = recipesFromApi.data.results;
    //const dataRecipesApi = recipesFromApi.results;
    const resultsApi = dataRecipesApi.map((recip) => {
        return {
            id: recip.id,
            name: recip.title,
            summary: recip.summary,
            diets: recip.diets.map((element) => {return {name: element}}),
            healthScore: recip.healthScore,
            image: recip.image,
            dishTypes: recip.dishTypes,
            steps: recip.analyzedInstructions.map((steps) => {
                return steps.steps.map((step) => { 
                    let stepNumber = step.number;
                    let stepText = step.step;
                    return (stepNumber + ": "+ stepText)
                })
            }).flat(1),

        }
    })

    // console.log(resultadosApi);
    return resultsApi;

    } catch (error) {
        console.log('No se pudo contactar a la API para descargar las recetas', error.message);
    }
}


const getRecipesFromDB = async () => {
    try{
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    } catch (error) {
        console.log('No se pudo crear la receta en la Base de Datos', error.message);
    }
}

const getAllDiets = async () => {
    try{
     const dietsFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=false&addRecipeInformation=true&number=50`)
    //const dietsFromApi = myJson
     const dataDietsApi = dietsFromApi.data.results;
    //const dataDietsApi = dietsFromApi.results;
    // console.log(dataRecipesApi);
    const resultsApi = dataDietsApi.map((recip) => {
        return {
            diets: recip.diets,
        }
    })

    const dietsArrays = resultsApi.map((e) => {
        return e.diets
    })

    let dietsOneArray = dietsArrays.flat(1)

    let diets = [];

    for (let i = 0; i < dietsOneArray.length; i++) {
        let diet = dietsOneArray[i]

        if (diets.includes(diet) === false) {
        diets.push(diet)
        }
    }

    dietsObjectsArray = []

    diets.forEach(diet => {
        dietsObjectsArray.push({
            name: diet
        })
    });

    return dietsObjectsArray;

    } catch (error) {
        console.log('No se pudo contactar a la API para descargar las dietas', error.message);
    }
}


const getAllRecipes = async () => {
    const recipesFromApi = await getRecipesFromApi();
    const recipesFromDB = await getRecipesFromDB();
    const allRecipes = recipesFromApi.concat(recipesFromDB);
    return allRecipes

};


module.exports = {
    getAllRecipes,
    getAllDiets,
}