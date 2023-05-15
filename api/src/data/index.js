const fetchDiets = require("./fetchDiets");
const fetchRecipes = require("./fetchRecipes");

module.exports = {
  list: async () => await fetchRecipes(),
  diets: async () => await fetchDiets(),
};
