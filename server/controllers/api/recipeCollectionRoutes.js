const router = require("express").Router();
const { Recipe, User } = require("../../models");

router.get("/:userId", async (req, res) => {
  Recipe.find({ author: req.params.userId })
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
