const { connect, connection } = require("mongoose");

connect("mongodb://localhost/nomdotcomDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
