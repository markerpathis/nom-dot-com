const { Schema, model } = require("mongoose");
const ingredientSchema = require("./Ingredient");
const directionSchema = require("./Direction");

const recipeSchema = new Schema(
  {
    recipeName: { type: String, required: true, maxlength: 100 },
    recipeDesc: { type: String },
    ingredients: [ingredientSchema],
    recipeDirections: [directionSchema],
    author: { type: String, required: true },
    public: { type: Boolean, default: false, required: true },
    createdDate: { type: Date, default: Date.now() },
    tagCuisine: { type: String },
    tagDishType: { type: String },
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
