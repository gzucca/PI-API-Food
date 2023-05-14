const recipes = require("../data")
const { response } = require("../utils");

module.exports = async (req, res) => {
  const recipesList = await recipes.list();
  response(res, 200, recipesList);
};