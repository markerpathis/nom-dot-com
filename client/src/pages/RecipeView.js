import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

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
        <li className="pb-2" key={index}>
          {ingredient.ingredientDescrip}
        </li>
      );
    });
  };

  const populateDirectionData = () => {
    return directionData.map((direction, index) => {
      return (
        <li className="pb-2" key={index}>
          {direction.directionDescrip}
        </li>
      );
    });
  };

  return (
    <>
      {recipeData ? (
        <Container>
          {/* title  */}
          <h2 className="pt-3 border-bottom border-dark border-2">{recipeData.recipeName}</h2>

          {/* description */}
          <div className="pt-3 pb-3">{recipeData.recipeDesc}</div>

          {/* ingredients */}
          <h4 className="">Ingredients</h4>
          <ul>{populateIngredientData()}</ul>

          {/* directions */}
          <h4 className="">Directions</h4>
          <ol>{populateDirectionData()}</ol>
        </Container>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}
