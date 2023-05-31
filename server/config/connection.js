const { connect, connection } = require("mongoose");

connect(process.env.MONGODB_URI || "mongodb://localhost/nomdotcomDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
