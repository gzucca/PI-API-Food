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
        if(name){
            let recipes =  allRecipes.filter(recip => recip.name.toLowerCase().includes(name.toLowerCase()));
            if (recipes.length > 0) {
            return res.status(200).send(recipes)
            } else {
            return res.status(404).send('No existe ninguna receta con ese nombre.');
        }}  else {
            return res.status(200).send(allRecipes) 
        }          
});

router.get('/recipes/:id', async (req, res) => {
    let {id} = (req.params);    
    const allRecipes = await getAllRecipes();
    try {
        if(id){
            let recipes = await allRecipes.filter(recip => recip.id == (id));
            recipes.length ? 
            res.status(200).send(recipes) :
            res.status(404).send('No existe ninguna receta con ese ID.');
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

router.post('/recipes', async (req, res) => {
    const {name, summary, healthScore, dishTypes, image, steps, diets} = req.body;
    try {
        if(!name || !summary || !steps || !diets){
            return res.status(404).send("Falta enviar datos obligatorios")}
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            dishTypes,
            image,
            steps,
    })

    let newRecipeDiets = await Diet.findAll({
        where: {name : diets}
    })

    newRecipe.addDiet(newRecipeDiets)

    res.status(200).json('Receta creada');
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
