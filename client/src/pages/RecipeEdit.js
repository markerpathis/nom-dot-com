import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function RecipeCreate() {
  const [recipeData, setRecipeData] = useState({ recipeName: "", recipeDesc: "", ingredients: [], recipeDirections: [] });

  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setRecipeDesc] = useState("");
  const [ingredientList, setIngredientList] = useState([{ ingredientDescrip: "" }]);
  const [recipeDirectionList, setRecipeDirectionList] = useState([{ directionDescrip: "" }]);
  const navigate = useNavigate();
  const recipeId = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  const getRecipe = async () => {
    try {
      await axios.get(`http://localhost:3001/api/recipes/${recipeId}`).then((data) => {
        setRecipeData(data.data);
        // setRecipeData({ recipeName: recipeData.recipeName, recipeDesc: recipeData.recipeDesc, ingredients: [recipeData.ingredients] });
        // console.log(recipeData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => {
    setRecipeName(recipeData.recipeName);
    setRecipeDesc(recipeData.recipeDesc);
    setIngredientList(recipeData.ingredients);
    setRecipeDirectionList(recipeData.recipeDirections);
  }, [recipeData]);

  const handleInputChange = (event, index) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputType === "recipeName") {
    //   setRecipeData({ ...recipeData, recipeName: inputValue });
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

  const updateRecipe = async () => {
    try {
      await axios.put(`http://localhost:3001/api/recipes/${recipeId}`, {
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

  console.log({ ingredientList });

  return (
    <>
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
            <Form.Control name="recipeName" className="pr-5" value={recipeName || ""} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="my-1 pb-3">
            <h4>Description</h4>
            <Form.Control name="recipeDesc" as="textarea" rows={2} placeholder="Description of your recipe" value={recipeDesc || "loading"} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="my-1 pb-3">
            <h4>Ingredients</h4>
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

                  {ingredientList.length > 1 && (
                    <Col xs="auto" className="">
                      <Button type="button" style={{ width: "100px" }} onClick={() => handleIngredientRemove(index)}>
                        Remove
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row>
                  {ingredientList.length - 1 === index && (
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
            {recipeDirectionList?.map((singleDirection, index) => (
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
                  {recipeDirectionList.length > 1 && (
                    <Col xs="auto" className="">
                      <Button type="button" style={{ width: "100px" }} onClick={() => handleDirectionRemove(index)}>
                        Remove
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row>
                  {recipeDirectionList.length - 1 === index && (
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
            <Button type="submit" style={{ width: "150px" }} onClick={updateRecipe}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
