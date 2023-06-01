router.get("/api/recipeCollection/:userId", async (req, res) => {
  console.log("HEYYYYYYYYY");
  Recipe.find({ author: req.params.userId })
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(500).json(err));
});

router.post("/api/recipes", async (req, res) => {
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

router.get("/api/recipes", async (req, res) => {
  Recipe.find()
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(500).json(err));
});

router.get("/api/recipes/:recipeId", async (req, res) => {
  Recipe.findOne({ _id: req.params.recipeId })
    .select("-__v")
    .then((recipe) => (!recipe ? res.status(404).json({ message: "No recipe with that ID" }) : res.json(recipe)))
    .catch((err) => res.status(500).json(err));
});

router.put("/api/recipes/:recipeId", async (req, res) => {
  Recipe.findOneAndUpdate({ _id: req.params.recipeId }, { $set: req.body }, { runValidators: true, new: true })
    .then((recipe) => (!recipe ? res.status(404).json({ message: "No recipe with that id!" }) : res.json(recipe)))
    .catch((err) => res.status(500).json(err));
});

router.post("/api/users", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    res.status(200).json(userData);
  } catch (err) {
    console.log({ err });

    res.status(400).json(err);
  }
});

router.get("/api/users", async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

router.get("/api/users/:userId", async (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select("-__v")
    .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)))
    .catch((err) => res.status(500).json(err));
});

router.post("/api/users/login", async (req, res) => {
  // console.log(req);
  try {
    const userData = await User.findOne({ email: req.body.email });
    console.log("USERDATA:", userData);
    if (!userData) {
      res.status(400).json({ message: "Incorrect email or password, please try again" });
      console.log("no user data");
      return;
    }

    const validPassword = await userData.isCorrectPassword(req.body.password);
    console.log("validpassword: ", validPassword);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect credentials." });
      return;
    }

    const token = signToken(userData);
    res.json({ user: userData, token: token, message: "You are now logged in!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/api/users/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//   web: node server/server.js
