const { catchedAsync } = require("../utils");

module.exports = {
  getRecipes: catchedAsync(require("./getRecipes")),
};
