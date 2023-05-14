const recipes = require("../data");
const { response } = require("../utils");

module.exports = async (req, res) => {
  const dietsList = await recipes.diets();
  response(res, 200, dietsList);
};
