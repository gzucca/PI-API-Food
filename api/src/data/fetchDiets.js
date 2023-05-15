const { API_KEY } = process.env;
const { Diet } = require("../db");

module.exports = async () => {
  try {
    return (dietsInDB = await Diet.findAll());
  } catch (error) {
    console.log("Could not fetch diets from DB:", error.message);
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=false&addRecipeInformation=true&number=50`
    );
    const diets = await response.json();
    const resultsApi = diets.results.map((recip) => {
      return {
        diets: recip.diets,
      };
    });

    const dietsArrays = resultsApi.map((e) => {
      return e.diets;
    });

    let dietsOneArray = dietsArrays.flat(1);

    let dietsArray = [];

    for (let i = 0; i < dietsOneArray.length; i++) {
      let diet = dietsOneArray[i];

      if (dietsArray.includes(diet) === false) {
        dietsArray.push(diet);
      }
    }

    dietsObjectsArray = [];

    dietsArray.forEach((diet) => {
      dietsObjectsArray.push({
        name: diet,
      });
    });

    const showDiets = await Diet.bulkCreate(dietsObjectsArray);

    return showDiets;
  } catch (error) {
    console.log("Could not fetch diets from API:", error.message);
  }
};
