const { Schema } = require("mongoose");

const ingredientSchema = new Schema(
  {
    ingredientName: { type: String, required: true, maxlength: 50 },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true, maxlength: 20 },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = ingredientSchema;
