const { catchedAsync } = require("../utils");

module.exports = {
  getRecipes: catchedAsync(require("./getRecipes")),
  getDiets: catchedAsync(require("./getDiets")),
  getRecipeById: catchedAsync(require("./getRecipeById")),
  postRecipe: catchedAsync(require("./postRecipe")),
};
