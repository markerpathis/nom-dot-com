const express = require("express");
const path = require("path");
const db = require("./config/connection");
require("dotenv").config();
const routes = require("./controllers");

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.use(routes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
