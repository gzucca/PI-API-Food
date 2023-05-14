const recipes = require("../data");
const { response } = require("../utils");

module.exports = async (req, res) => {
  const { name } = req.query;
  const recipesList = await recipes.list();
  if (name) {
    filteredRecipeList = recipesList.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    response(res, 200, filteredRecipeList);
  }
  response(res, 200, recipesList);
};
