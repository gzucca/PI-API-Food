const { Recipe, Diet } = require("../db");




const getAllDiets = async () => {
  try {
    const dietsFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=false&addRecipeInformation=true&number=50`)
    const dataDietsApi = dietsFromApi.data.results;
    //const dataDietsApi = myJson.results;
    // console.log(dataRecipesApi);
    const resultsApi = dataDietsApi.map((recip) => {
      return {
        diets: recip.diets,
      };
    });

    const dietsArrays = resultsApi.map((e) => {
      return e.diets;
    });

    let dietsOneArray = dietsArrays.flat(1);

    let diets = [];

    for (let i = 0; i < dietsOneArray.length; i++) {
      let diet = dietsOneArray[i];

      if (diets.includes(diet) === false) {
        diets.push(diet);
      }
    }

    dietsObjectsArray = [];

    diets.forEach((diet) => {
      dietsObjectsArray.push({
        name: diet,
      });
    });

    return dietsObjectsArray;
  } catch (error) {
    console.log(
      "No se pudo contactar a la API para descargar las dietas",
      error.message
    );
  }
};

const getAllRecipes = async () => {
  const recipesFromApi = await getRecipesFromApi();
  const recipesFromDB = await getRecipesFromDB();
  const allRecipes = recipesFromApi.concat(recipesFromDB);
  return allRecipes;
};

module.exports = {
  getAllRecipes,
  getAllDiets,
};
