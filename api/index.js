//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const Recipe = require('./src/models/Recipe.js');

server.get('recipes', async (req, res) => {
  const {name} = req.query;
  const condition = name? {where: {name: name}} : {};
  try {
    const recipes = await Recipe.findAll(condition);
    res.json(recipes.length > 0? recipes : 'No existe ninguna receta con ese nombre.');
  } catch (e) {
    res.send(e);
  }
})

server.get('recipes/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const recipeDetail = await Recipe.findByPk(id);
    const recipeDiets = await RecipeDiet.findByPk(id);
    res.json(recipeDetail.length > 0? recipeDetail + recipeDiets : 'No existe ninguna receta con ese ID.');
  } catch (e) {
    res.send(e);
  }
})

server.post('recipes', async (req, res) => {
  const {name, summary, healthScore, steps, diets} = req.body;
  try {
    const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      steps,
      diets
    })
    res.json(newRecipe);
  } catch (e) {
    res.send(e);
  }
})

server.get('diets', async (req, res) => {
  const {id} = req.params;
  try {
    const recipeDetail = await Recipe.findByPk(id);
    const recipeDiets = await RecipeDiet.findByPk(id);
    res.json(recipeDetail.length > 0? recipeDetail + recipeDiets : 'No existe ninguna receta con ese ID.');
  } catch (e) {
    res.send(e);
  }
})

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
