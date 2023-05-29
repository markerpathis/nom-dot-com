const router = require("express").Router();
const { Recipe } = require("../../models");

router.post("/", async (req, res) => {
  Recipe.create(req.body)
    .then((dbRecipeData) => res.json(dbRecipeData))
    .catch((err) => res.status(500).json(err));
});

router.get("/", async (req, res) => {
  Recipe.find()
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(500).json(err));
});

router.get("/:recipeId", async (req, res) => {
  Recipe.findOne({ _id: req.params.recipeId })
    .select("-__v")
    .then((recipe) => (!recipe ? res.status(404).json({ message: "No recipe with that ID" }) : res.json(recipe)))
    .catch((err) => res.status(500).json(err));
});

router.put("/:recipeId", async (req, res) => {
  Recipe.findOneAndUpdate({ _id: req.params.recipeId }, { $set: req.body }, { runValidators: true, new: true })
    .then((recipe) => (!recipe ? res.status(404).json({ message: "No recipe with that id!" }) : res.json(recipe)))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
