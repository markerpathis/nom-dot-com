const { Recipe } = require("../models");

module.exports = {
  // Get all recipes
  getRecipes(req, res) {
    Recipe.find()
      .then((recipes) => res.json(recipes))
      .catch((err) => res.status(500).json(err));
  },
  // Post a recipe
  postRecipe(req, res) {
    Recipe.create(req.body)
      .then((dbRecipeData) => res.json(dbRecipeData))
      .catch((err) => res.status(500).json(err));
  },
};
