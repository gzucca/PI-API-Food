const express = require("express");
const { Recipe, Diet } = require("../db");
const { getAllRecipes, getAllDiets } = require("./controllers.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  const allRecipes = await getAllRecipes();
  try {
    if (name) {
      let recipes = allRecipes.filter((recip) =>
        recip.name.toLowerCase().includes(name.toLowerCase())
      );
      recipes.length
        ? res.status(200).send(recipes)
        : res.status(404).send("No existe ninguna receta con ese nombre.");
    } else {
      res.status(200).send(allRecipes);
    }
  } catch (e) {
    res.status(404).send("Error", e.message);
  }
});

router.get("/recipes/:id", async (req, res) => {
  let { id } = req.params;
  const allRecipes = await getAllRecipes();
  try {
    if (id) {
      let recipes = await allRecipes.filter((recip) => recip.id == id);
      recipes.length
        ? res.status(200).send(recipes)
        : res.status(404).send("No existe ninguna receta con ese ID.");
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post("/recipes", async (req, res) => {
  const { name, summary, healthScore, dishTypes, image, steps, diets } =
    req.body;
  try {
    if (!name || !summary || !steps || !diets) {
      res.status(404).send("Faltan datos obligatorios para crear la receta");
    }

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

    res.status(200).json("Receta creada");
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.get("/diets", async (req, res) => {
  try {
    const dietsInDB = await Diet.findAll();
    if (dietsInDB.length < 10) {
      const allDiets = await getAllDiets();
      const showDiets = await Diet.bulkCreate(allDiets);
      res.status(200).send(showDiets);
    } else {
      res.status(200).send(dietsInDB);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
