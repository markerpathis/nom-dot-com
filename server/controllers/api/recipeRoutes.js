const router = require("express").Router();
const { Recipe, User } = require("../../models");

router.post("/", async (req, res) => {
  Recipe.create(req.body)
    .then((recipe) => {
      return User.findOneAndUpdate({ _id: req.body.author }, { $addToSet: { recipes: recipe._id } }, { new: true });
    })
    .then((user) =>
      !user
        ? res.status(404).json({
            message: "Recipe created, but found no user with that ID",
          })
        : res.json("Created recipe")
    )
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
