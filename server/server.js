const path = require("path");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const cors = require("cors");
const db = require("./config/connection");
const routes = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
//   });
// }
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

app.use(routes);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// db.once("open", () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//   });
// });

mongoose.connect(
  process.env.MONGODB_URI,

  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
