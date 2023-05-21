import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RecipeView({ recipeId }) {
  const [recipeData, setRecipeData] = useState([]);
  const [ingredientData, setIngredientData] = useState([]);
  const [directionData, setDirectionData] = useState([]);

  const getRecipe = async () => {
    if (!recipeId) {
      recipeId = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
    }
    try {
      await axios.get(`http://localhost:3001/api/recipes/${recipeId}`).then((data) => {
        setRecipeData(data.data);
        setIngredientData(data.data.ingredients);
        setDirectionData(data.data.recipeDirections);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const populateIngredientData = () => {
    return ingredientData.map((ingredient, index) => {
      return (
        <div key={index}>
          <div>{ingredient.ingredientDescrip}</div>
        </div>
      );
    });
  };

  const populateDirectionData = () => {
    return directionData.map((direction, index) => {
      return (
        <div key={index}>
          <div>{direction.directionDescrip}</div>
        </div>
      );
    });
  };

  return (
    <>
      {recipeData ? (
        <div>
          <h2>{recipeData.recipeName}</h2>
          <div>{recipeData.recipeDesc}</div>
          <h4>Ingredients</h4>
          <div>{populateIngredientData()}</div>
          <h4>Directions</h4>
          <div>{populateDirectionData()}</div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}
