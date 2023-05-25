import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function RecipeCreate() {
  const [recipeData, setRecipeData] = useState({ recipeName: "", recipeDesc: "", ingredients: [{ ingredientDescrip: "" }], recipeDirections: [{ directionDescrip: "" }] });
  const navigate = useNavigate();

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

  const postRecipe = async () => {
    try {
      await axios.post("http://localhost:3001/api/recipes", {
        recipeName: recipeData.recipeName,
        recipeDesc: recipeData.recipeDesc,
        ingredients: recipeData.ingredients,
        recipeDirections: recipeData.recipeDirections,
      });
      navigate("/recipelist");
    } catch (err) {
      console.log(err);
      setShowAlert(true);
    }
  };

  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <Container>
        {showAlert === true && (
          <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Error!</Alert.Heading>
            <p>Please fill out all the required fields. If you no longer need a row for an ingredient, please remove it.</p>
          </Alert>
        )}
        <h2 className="pt-3 border-bottom border-dark border-2">Add A Recipe</h2>
        <Form>
          <Form.Group className="my-1 pt-3 pb-3">
            <h4>Recipe Name</h4>
            <Form.Control name="recipeName" className="pr-5" placeholder="Recipe Name" value={recipeData.recipeName || ""} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="my-1 pb-3">
            <h4>Description</h4>
            <Form.Control name="recipeDesc" as="textarea" rows={2} placeholder="Description of your recipe" value={recipeData.recipeDesc || ""} onChange={handleInputChange} />
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
                      <Button type="button" style={{ width: "100px" }} onClick={() => handleIngredientRemove(index)}>
                        Remove
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row>
                  {recipeData.ingredients.length - 1 === index && (
                    <Col className="my-1">
                      <Button type="button" style={{ width: "150px" }} onClick={handleIngredientAdd}>
                        Add Ingredient
                      </Button>
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
                      <Button type="button" style={{ width: "100px" }} onClick={() => handleDirectionRemove(index)}>
                        Remove
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row>
                  {recipeData.recipeDirections.length - 1 === index && (
                    <Col className="my-1">
                      <Button type="button" style={{ width: "150px" }} onClick={handleDirectionAdd}>
                        Add Direction
                      </Button>
                    </Col>
                  )}
                </Row>
              </div>
            ))}
          </Form.Group>
        </Form>

        <Row>
          <Col className="my-1">
            <Button type="submit" style={{ width: "150px" }} onClick={postRecipe}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
