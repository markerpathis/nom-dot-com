const { Schema, model } = require("mongoose");
const ingredientSchema = require("./Ingredient");
const directionSchema = require("./Direction");

const recipeSchema = new Schema(
  {
    recipeName: { type: String, required: true, maxlength: 100 },
    recipeDesc: { type: String },
    ingredients: [ingredientSchema],
    recipeDirections: [directionSchema],
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
