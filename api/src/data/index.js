const fetchRecipes = require("./fetchRecipes")

module.exports = {
  list: async () => await fetchRecipes(),
}