const path = require("path");
const express = require("express");

const cors = require("cors");
const db = require("./config/connection");
const routes = require("./controllers");

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
