import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RecipeView({ recipeId }) {
  const [recipeData, setRecipeData] = useState([]);

  const getRecipe = () => {
    axios
      .get(`http://localhost:3001/api/recipes/${recipeId}`)
      .then((data) => {
        console.log(data.data);
        console.log(recipeId);
        setRecipeData(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(recipeId);
    getRecipe();
  }, []);

  return (
    <>
      <div>hey</div>
    </>
  );
}
