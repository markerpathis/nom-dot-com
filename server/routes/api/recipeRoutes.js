const router = require("express").Router();

const { getRecipes, postRecipe, getSingleRecipe } = require("../../controllers/recipeController");

// /api/recipes
router.route("/").get(getRecipes).post(postRecipe);

// /api/recipes/:recipeId
router.route("/:recipeId").get(getSingleRecipe);

module.exports = router;
