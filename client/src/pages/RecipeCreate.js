import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RecipeCreate() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setRecipeDesc] = useState("");
  const [ingredientList, setIngredientList] = useState([{ ingredientDescrip: "" }]);
  const [recipeDirectionList, setRecipeDirectionList] = useState([{ directionDescrip: "" }]);
  console.log(recipeDirectionList);

  const handleInputChange = (event, index) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputType === "recipeName") {
      setRecipeName(inputValue);
    } else if (inputType === "recipeDesc") {
      setRecipeDesc(inputValue);
    } else if (inputType === "ingredientDescrip") {
      const listIngredient = [...ingredientList];
      listIngredient[index][inputType] = inputValue;
      setIngredientList(listIngredient);
    } else {
      const listDirection = [...recipeDirectionList];
      listDirection[index][inputType] = inputValue;
      setRecipeDirectionList(listDirection);
    }
  };

  const handleIngredientAdd = () => {
    setIngredientList([...ingredientList, { ingredientDescrip: "" }]);
  };

  const handleIngredientRemove = (index) => {
    const list = [...ingredientList];
    list.splice(index, 1);
    setIngredientList(list);
  };

  const handleDirectionAdd = () => {
    setRecipeDirectionList([...recipeDirectionList, { directionDescrip: "" }]);
  };

  const handleDirectionRemove = (index) => {
    const list = [...recipeDirectionList];
    list.splice(index, 1);
    setRecipeDirectionList(list);
  };

  const navigate = useNavigate();

  const postRecipe = async () => {
    try {
      await axios.post("http://localhost:3001/api/recipes", {
        recipeName: recipeName,
        recipeDesc: recipeDesc,
        ingredients: ingredientList,
        recipeDirections: recipeDirectionList,
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
      {showAlert === true && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>Please fill out all the required fields. If you no longer need a row for an ingredient, please remove it.</p>
        </Alert>
      )}
      <h2>Add A Recipe</h2>
      <Form>
        <Form.Group className="my-1">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control name="recipeName" placeholder="Recipe Name" value={recipeName || ""} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="my-1">
          <Form.Label>Description</Form.Label>
          <Form.Control name="recipeDesc" as="textarea" rows={2} placeholder="Description of your recipe" value={recipeDesc || ""} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="my-1">
          <Form.Label>Ingredients</Form.Label>
          {ingredientList.map((singleIngredient, index) => (
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
                <Col xs="auto" className="">
                  {ingredientList.length > 1 && (
                    <Button type="button" onClick={() => handleIngredientRemove(index)}>
                      Remove
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                {ingredientList.length - 1 === index && (
                  <Col className="my-1">
                    <Button type="button" onClick={handleIngredientAdd}>
                      Add Ingredient
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
          ))}
        </Form.Group>
        <Form.Group className="my-1">
          <Form.Label>Directions</Form.Label>
          {recipeDirectionList.map((singleDirection, index) => (
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
                <Col xs="auto" className="">
                  {recipeDirectionList.length > 1 && (
                    <Button type="button" onClick={() => handleDirectionRemove(index)}>
                      Remove
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                {recipeDirectionList.length - 1 === index && (
                  <Col className="my-1">
                    <Button type="button" onClick={handleDirectionAdd}>
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
          <Button type="submit" onClick={postRecipe}>
            Save Recipe
          </Button>
        </Col>
      </Row>
    </>
  );
}
