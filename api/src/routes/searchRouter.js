const axios = require('axios');
const {API_key} = process.env;

//traemos todas las recetas de la API

const getRecipesFromApi = async () => {
    const RecipesFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&includeNutrition=true`)
    console.log('Respuesta api:', RecipesFromApi);
    const dataRecipesApi = dataRecipesApi.data.slice(0, 20);
    //console.log('recorte api', dataRecipesApi);
    const data = dataRecipesApi.map(recip => {
        return {
            id: recip.id,
            name: recip.name,
            summary: recip.summary,
            healthScore: recip.healthScore,
            steps: recip.steps
        }
    })
    //console.log('soy la nueva data recortada', data);
    return data;
}

module.exports = getRecipesFromApi;