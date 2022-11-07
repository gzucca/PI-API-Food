require('dotenv').config();
const axios = require('axios');
const {Recipe, Diet} = require('../db');
const {API_KEY} = process.env;
const myJson = require ("../../complexSearch2.json");

//traemos todas las recetas de la API


const getRecipesFromApi =  () => {
    // const recipesFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=false&addRecipeInformation=true&number=100`)
    const recipesFromApi = myJson
    // const dataRecipesApi = recipesFromApi.data.results;
    const dataRecipesApi = recipesFromApi.results;
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

const getAllDiets =  () => {
    // const dietsFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=false&addRecipeInformation=true&number=50`)
    const dietsFromApi = myJson
    // const dataDietsApi = dietsFromApi.data.results;
    const dataDietsApi = dietsFromApi.results;
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
        const diet = dietsOneArray[i];
        if (diets.includes(diet) === false) {
        diets.push(diet)
        }
    }

    // console.log("Total de dietas:", diets);


    return diets;
};

// const getAllDishTypes =  () => {

//     const dishesFromApi = myJson

//     const datadishesApi = dishesFromApi.results;

//     const resultsApi = datadishesApi.map((recip) => {
//         return {
//             dishTypes: recip.dishTypes,
//         }
//     })

//     const dishTypesArrays = resultsApi.map((e) => {
//         return e.dishTypes
//     })

//     let dishTypesOneArray = dishTypesArrays.flat(1)

//     let dishTypes = [];

//     for (let i = 0; i < dishTypesOneArray.length; i++) {
//         const dishType = dishTypesOneArray[i];
//         if (dishTypes.includes(dishType) === false) {
//         dishTypes.push(dishType)
//         }
//     }




//     return dishTypes;
// };

// console.log(getAllDishTypes())

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