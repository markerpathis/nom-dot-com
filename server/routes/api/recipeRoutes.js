const router = require("express").Router();

const { getRecipes, postRecipe } = require("../../controllers/recipeController");

// /api/recipes
router.route("/").get(getRecipes).post(postRecipe);

module.exports = router;
