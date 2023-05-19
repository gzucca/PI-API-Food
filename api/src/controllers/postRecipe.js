const { response } = require("../utils");
const { Recipe, Diet } = require("../db");

module.exports = async (req, res) => {
  const { name, summary, healthScore, dishTypes, image, steps, diets } =
    req.body;
  const newRecipe = await Recipe.create({
    name,
    summary,
    healthScore,
    dishTypes,
    image,
    steps,
  });

  let newRecipeDiets = await Diet.findAll({
    where: { name: diets },
  });

  newRecipe.addDiet(newRecipeDiets);

  response(res, 201, newRecipe);
};
