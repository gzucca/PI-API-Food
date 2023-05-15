const recipes = require("../data");
const { response } = require("../utils");
const { ClientError } = require("../utils/errors");

module.exports = async (req, res) => {
  const { id } = req.params;
  const recipesList = await recipes.list();
  const recipe = recipesList.filter((recip) => recip.id === Number(id));
  if (recipe.length) response(res, 200, recipe);
  else throw new ClientError("No recipe found with given ID", 404);
};
