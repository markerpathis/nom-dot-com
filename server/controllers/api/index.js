const router = require("express").Router();
const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");
const recipeCollectionRoutes = require("./recipeCollectionRoutes");

router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);
router.use("/recipeCollection", recipeCollectionRoutes);

module.exports = router;
