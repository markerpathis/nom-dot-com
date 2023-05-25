import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function RecipeView() {
  const [recipeData, setRecipeData] = useState({ recipeName: "", recipeDesc: "", ingredients: [], recipeDirections: [] });
  const recipeId = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
  const navigate = useNavigate();

  const getRecipe = async () => {
    try {
      await axios.get(`http://localhost:3001/api/recipes/${recipeId}`).then((data) => {
        setRecipeData({ recipeName: data.data.recipeName, recipeDesc: data.data.recipeDesc, ingredients: data.data.ingredients, recipeDirections: data.data.recipeDirections });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const populateIngredientData = () => {
    return recipeData.ingredients.map((ingredient, index) => {
      return (
        <li className="pb-2" key={index}>
          {ingredient.ingredientDescrip}
        </li>
      );
    });
  };

  const populateDirectionData = () => {
    return recipeData.recipeDirections.map((direction, index) => {
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
          <h4 className="">Instructions</h4>
          <ol>{populateDirectionData()}</ol>

          <Button type="button" style={{ width: "150px" }} onClick={() => navigate(`/recipe-edit/${recipeId}`)}>
            {/* <Button type="button" style={{ width: "150px" }}> */}
            Edit
          </Button>
        </Container>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}
