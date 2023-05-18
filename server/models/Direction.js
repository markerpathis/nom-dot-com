const { Schema } = require("mongoose");

const directionSchema = new Schema(
  {
    directionDescrip: { type: String, required: true },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = directionSchema;
