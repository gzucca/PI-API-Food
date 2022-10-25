const express = require('express');

const { getRecipesFromApi, getRecipesFromDB, getAllRecipes } = require('./controllers.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', async (req, res) => {
    const {name} = req.query;
    const allRecipes = await getAllRecipes();
    try {
        if(name){
            let recipes = await allRecipes.filter(recip => recip.name.toLowerCase().includes(name.toLowerCase()));
            recipes.length ? 
            res.status(200).send(recipes) :
            res.status(404).send('No existe ninguna receta con ese nombre.');
        }
    } catch (e) {
        res.send(e);
    }
});

router.get('/recipes/:id', async (req, res) => {
    let {id} = (req.params);
    console.log(id);    
    const allRecipes = await getAllRecipes();
    try {
        if(id){
            let recipes = await allRecipes.filter(recip => recip.id === Number(id));
            console.log(recipes);
            recipes.length ? 
            res.status(200).send(recipes) :
            res.status(404).send('No existe ninguna receta con ese ID.');
        }
    } catch (e) {
        res.send(e);
    }
});

// router.post('recipes', async (req, res) => {
//     const {name, summary, healthScore, steps, diets} = req.body;
//     try {
//         const newRecipe = await Recipe.create({
//             name,
//             summary,
//             healthScore,
//             steps,
//             diets
//     })
//     res.json(newRecipe);
//     } catch (e) {
//         res.send(e);
//     }
// })

// router.get('diets', async (req, res) => {
//     const {id} = req.params;
//     try {
//         const recipeDetail = await Recipe.findByPk(id);
//         const recipeDiets = await RecipeDiet.findByPk(id);
//         res.json(recipeDetail.length > 0? recipeDetail + recipeDiets : 'No existe ninguna receta con ese ID.');
//     } catch (e) {
//         res.send(e);
//     }
// })

module.exports = router;
