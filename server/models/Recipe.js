const { Schema, model } = require("mongoose");
const ingredientSchema = require("./Ingredient");

const recipeSchema = new Schema(
  {
    recipeName: { type: String, required: true, maxlength: 100 },
    ingredients: [ingredientSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
const Recipe = model("recipe", recipeSchema);

module.exports = Recipe;
