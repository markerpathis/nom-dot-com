const { Schema } = require("mongoose");

const ingredientSchema = new Schema(
  {
    ingredientDescrip: { type: String, required: true, maxlength: 100 },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = ingredientSchema;
