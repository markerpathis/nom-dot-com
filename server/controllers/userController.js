const { User } = require("../models");

module.exports = {
  // Post a recipe
  postUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
};
