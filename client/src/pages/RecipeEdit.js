import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ButtonComp from "../components/ButtonComp";
import Auth from "../utils/auth";

export default function RecipeCreate() {
  const [recipeData, setRecipeData] = useState({ recipeName: "", recipeDesc: "", ingredients: [], recipeDirections: [] });
  const navigate = useNavigate();
  const recipeId = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  const authCheck = () => {
    if (Auth.loggedIn() === false) {
      navigate("/login");
    } else {
      return;
    }
  };

  const getRecipe = async () => {
    let getApiUrl = "";
    if (process.env.NODE_ENV === "production") {
      getApiUrl = `https://nomdotcom.herokuapp.com/api/recipes/${recipeId}`;
    } else {
      getApiUrl = `http://localhost:3001/api/recipes/${recipeId}`;
    }
    try {
      await axios.get(getApiUrl).then((data) => {
        // console.log(data.data);
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

  const handleInputChange = (event, index) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputType === "recipeName") {
      setRecipeData({ ...recipeData, recipeName: inputValue });
    } else if (inputType === "recipeDesc") {
      setRecipeData({ ...recipeData, recipeDesc: inputValue });
    } else if (inputType === "ingredientDescrip") {
      const listIngredient = [...recipeData.ingredients];
      listIngredient[index][inputType] = inputValue;
      setRecipeData({ ...recipeData, ingredients: listIngredient });
    } else {
      const listDirection = [...recipeData.recipeDirections];
      listDirection[index][inputType] = inputValue;
      setRecipeData({ ...recipeData, recipeDirections: listDirection });
    }
  };

  const handleIngredientAdd = () => {
    const ingredientList = [...recipeData.ingredients, { ingredientDescrip: "" }];
    setRecipeData({ ...recipeData, ingredients: ingredientList });
  };

  const handleIngredientRemove = (index) => {
    const list = [...recipeData.ingredients];
    list.splice(index, 1);
    setRecipeData({ ...recipeData, ingredients: list });
  };

  const handleDirectionAdd = () => {
    const directionList = [...recipeData.recipeDirections, { directionDescrip: "" }];
    setRecipeData({ ...recipeData, recipeDirections: directionList });
  };

  const handleDirectionRemove = (index) => {
    const list = [...recipeData.recipeDirections];
    list.splice(index, 1);
    setRecipeData({ ...recipeData, recipeDirections: list });
  };

  const updateRecipe = async () => {
    let updateApiUrl = "";
    if (process.env.NODE_ENV === "production") {
      updateApiUrl = `https://nomdotcom.herokuapp.com/api/recipes/${recipeId}`;
    } else {
      updateApiUrl = `http://localhost:3001/api/recipes/${recipeId}`;
    }
    try {
      await axios.put(updateApiUrl, {
        recipeName: recipeData.recipeName,
        recipeDesc: recipeData.recipeDesc,
        ingredients: recipeData.ingredients,
        recipeDirections: recipeData.recipeDirections,
      });
      navigate(`/recipeview/${recipeId}`);
    } catch (err) {
      console.log(err);
      setShowAlert(true);
    }
  };

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div style={{ background: "#fef9ef" }} className="pt-4">
      <Container>
        {showAlert === true && (
          <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Error!</Alert.Heading>
            <p>Please fill out all the required fields. If you no longer need a row for an ingredient, please remove it.</p>
          </Alert>
        )}
        <h2 className="pt-3 border-bottom border-dark border-2">Update Recipe</h2>
        <Form>
          <Form.Group className="my-1 pt-3 pb-3">
            <h4>Recipe Name</h4>
            <Form.Control name="recipeName" className="pr-5" value={recipeData.recipeName || ""} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="my-1 pb-3">
            <h4>Description</h4>
            <Form.Control name="recipeDesc" as="textarea" rows={2} placeholder="Description of your recipe" value={recipeData.recipeDesc || "loading"} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="my-1 pb-3">
            <h4>Ingredients</h4>
            {recipeData.ingredients.map((singleIngredient, index) => (
              <div key={index}>
                <Row className="my-1">
                  <Col className="">
                    <Form.Control
                      name="ingredientDescrip"
                      placeholder="Ingredient (e.g., 1 cup shredded cheddar cheese)"
                      value={singleIngredient.ingredientDescrip || ""}
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </Col>

                  {recipeData.ingredients.length > 1 && (
                    <Col xs="auto" className="">
                      <ButtonComp label={"Remove"} width={"100px"} handleClick={() => handleIngredientRemove(index)}></ButtonComp>
                    </Col>
                  )}
                </Row>
                <Row>
                  {recipeData.ingredients.length - 1 === index && (
                    <Col className="my-1">
                      <ButtonComp label={"Add Ingredient"} handleClick={handleIngredientAdd}></ButtonComp>
                    </Col>
                  )}
                </Row>
              </div>
            ))}
          </Form.Group>
          <Form.Group className="my-1 pb-3">
            <h4>Instructions</h4>
            {recipeData.recipeDirections.map((singleDirection, index) => (
              <div key={index}>
                <Row className="my-1">
                  <Col className="">
                    <Form.Control
                      name="directionDescrip"
                      as="textarea"
                      rows={2}
                      placeholder="Directions for your recipe"
                      value={singleDirection.directionDescrip || ""}
                      onChange={(event) => handleInputChange(event, index)}
                    />
                  </Col>
                  {recipeData.recipeDirections.length > 1 && (
                    <Col xs="auto" className="">
                      <ButtonComp label={"Remove"} width={"100px"} handleClick={() => handleDirectionRemove(index)}></ButtonComp>
                    </Col>
                  )}
                </Row>
                <Row>
                  {recipeData.recipeDirections.length - 1 === index && (
                    <Col className="my-1">
                      <ButtonComp label={"Add Direction"} handleClick={handleDirectionAdd}></ButtonComp>
                    </Col>
                  )}
                </Row>
              </div>
            ))}
          </Form.Group>
        </Form>

        <Row>
          <Col>
            <ButtonComp label={"Save"} handleClick={updateRecipe}></ButtonComp>
            <ButtonComp label={"Cancel"} handleClick={() => navigate(`/recipeview/${recipeId}`)}></ButtonComp>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
