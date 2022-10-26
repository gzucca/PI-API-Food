const express = require('express');
const {Recipe, Diet} = require('../db');
const { getAllRecipes, getAllDiets } = require('./controllers.js');
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
            if (recipes.length > 0) {
                let recipesFiltered = recipes.map((recip) => {
                    return {
                    name: recip.name,
                    image: recip.image,
                    diets: recip.diets
                    } 
                })
                res.status(200).send(recipesFiltered)
            } else {
            res.status(404).send('No existe ninguna receta con ese nombre.');
        }}  else {
            res.status(200).send(allRecipes) 
        }          
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});

router.get('/recipes/:id', async (req, res) => {
    let {id} = (req.params);    
    const allRecipes = await getAllRecipes();
    try {
        if(id){
            let recipes = await allRecipes.filter(recip => recip.id === Number(id));
            recipes.length ? 
            res.status(200).send(recipes) :
            res.status(404).send('No existe ninguna receta con ese ID.');
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

router.post('/recipes', async (req, res) => {
    const {name, summary, healthScore, steps, diets} = req.body;
    try {
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            diets
    })
    res.status(200).send(newRecipe);
    } catch (e) {
        res.status(404).send(e.message);
    }
})

router.get('/diets', async (req, res) => {
    try {
        const allDiets = await getAllDiets();
        allDiets.forEach( (diet) => {
            Diet.findOrCreate({
                where: {name : diet},
            })
        })
        const showDiets = await Diet.findAll();
        res.status(200).send(showDiets)
    } catch (e) {
        res.status(404).send(e.message);
    }
})

module.exports = router;
