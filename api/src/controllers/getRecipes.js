const recipes = require("../data");
const { response } = require("../utils");
const { ClientError } = require("../utils/errors");

module.exports = async (req, res) => {
  const { name } = req.query;
  const recipesList = await recipes.list();
  if (name) {
    filteredRecipeList = recipesList.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filteredRecipeList.length) response(res, 200, filteredRecipeList);
    else throw new ClientError("No recipe found with given name", 404);
  }
  response(res, 200, recipesList);
};
