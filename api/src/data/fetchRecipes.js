const fetch = require("node-fetch"); //!only neccessary for node prior to 18
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const fetchRecipesAPI = async () => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeNutrition=false&addRecipeInformation=true&number=100`
    );
    const recipes = await response.json();
    return recipes.results.map((recip) => {
      return {
        id: recip.id,
        name: recip.title,
        summary: recip.summary,
        diets: recip.diets.map((element) => {
          return { name: element };
        }),
        healthScore: recip.healthScore,
        image: recip.image,
        dishTypes: recip.dishTypes,
        steps: recip.analyzedInstructions
          .map((steps) => {
            return steps.steps.map((step) => {
              let stepNumber = step.number;
              let stepText = step.step;
              return stepNumber + ": " + stepText;
            });
          })
          .flat(1),
      };
    });
  } catch (error) {
    console.log("Could not fetch recipes from API:", error.message);
  }
};

const fetchRecipesDB = async () => {
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log("Could not fetch recipes from DB:", error.message);
  }
};

module.exports = async function () {
  const recipesFromAPI = await fetchRecipesAPI();
  const recipesFromDB = await fetchRecipesDB();
  const allRecipes = recipesFromAPI
    ? recipesFromDB
      ? recipesFromAPI.concat(recipesFromDB)
      : recipesFromAPI
    : recipesFromDB;
  return allRecipes;
};
