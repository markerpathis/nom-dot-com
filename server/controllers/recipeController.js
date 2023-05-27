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
  // Get a single recipe
  getSingleRecipe(req, res) {
    Recipe.findOne({ _id: req.params.recipeId })
      .select("-__v")
      .then((recipe) => (!recipe ? res.status(404).json({ message: "No recipe with that ID" }) : res.json(recipe)))
      .catch((err) => res.status(500).json(err));
  },
  updateRecipe(req, res) {
    Recipe.findOneAndUpdate({ _id: req.params.recipeId }, { $set: req.body }, { runValidators: true, new: true })
      .then((recipe) => (!recipe ? res.status(404).json({ message: "No recipe with that id!" }) : res.json(recipe)))
      .catch((err) => res.status(500).json(err));
  },
  // Post a recipe
  postUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
};
