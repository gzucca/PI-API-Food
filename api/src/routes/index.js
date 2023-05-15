const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = express.Router();

router.get("/recipes", controllers.getRecipes);

router.get("/diets", controllers.getDiets);

router.get("/recipes/:id", controllers.getRecipeById);

router.post(
  "/recipes",
  middlewares.postRecipeValidation,
  controllers.postRecipe
);

router.use("*", (req, res) => {
  res.status(404).send({
    error: true,
    message: "Not Found",
  });
});

router.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message,
  });
});

module.exports = router;
