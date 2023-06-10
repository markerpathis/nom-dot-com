import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../components/ButtonComp";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Auth from "../utils/auth";

export default function RecipeView() {
  const [recipeData, setRecipeData] = useState({ recipeName: "", recipeDesc: "", ingredients: [], recipeDirections: [] });
  const recipeId = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
  const navigate = useNavigate();

  const authCheck = () => {
    if (Auth.loggedIn() === false) {
      navigate("/login");
    } else {
      return;
    }
  };

  const getRecipe = async () => {
    let recipeApiUrl = "";
    if (process.env.NODE_ENV === "production") {
      recipeApiUrl = `https://nomdotcom.herokuapp.com/api/recipes/${recipeId}`;
    } else {
      recipeApiUrl = `http://localhost:3001/api/recipes/${recipeId}`;
    }
    try {
      await axios.get(recipeApiUrl).then((data) => {
        setRecipeData({ recipeName: data.data.recipeName, recipeDesc: data.data.recipeDesc, ingredients: data.data.ingredients, recipeDirections: data.data.recipeDirections });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authCheck();
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

  const deleteRecipe = async () => {
    let deleteApiUrl = "";
    if (process.env.NODE_ENV === "production") {
      deleteApiUrl = `https://nomdotcom.herokuapp.com/api/recipes/${recipeId}`;
    } else {
      deleteApiUrl = `http://localhost:3001/api/recipes/${recipeId}`;
    }
    try {
      await axios.delete(deleteApiUrl);
      navigate(`/recipelist`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ background: "#fef9ef" }} className="pt-4">
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
          <Row>
            <Col>
              <ButtonComp label={"Edit"} handleClick={() => navigate(`/recipe-edit/${recipeId}`)}></ButtonComp>
              <ButtonComp label={"Delete"} handleClick={deleteRecipe}></ButtonComp>
            </Col>
          </Row>
        </Container>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}
