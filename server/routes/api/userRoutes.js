const router = require("express").Router();

const { postUser } = require("../../controllers/userController");

// /api/recipes
router.route("/").post(postUser);

module.exports = router;
