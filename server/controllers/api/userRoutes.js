const router = require("express").Router();
const { User } = require("../../models");
const { signToken } = require("../../utils/jwtAuth");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    res.status(200).json(userData);
  } catch (err) {
    console.log({ err });

    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

router.get("/:userId", async (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select("-__v")
    .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)))
    .catch((err) => res.status(500).json(err));
});

router.post("/login", async (req, res) => {
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

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
