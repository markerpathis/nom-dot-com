import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

export default function RecipeCreate() {
  const [recipeName, setRecipeName] = useState("");
  console.log(recipeName);

  const [ingredientList, setIngredientList] = useState([{ ingredientName: "", quantity: "", unit: "" }]);
  console.log(ingredientList);

  const handleRecipeNameChange = (event) => {
    const { target } = event;
    const inputValue = target.value;
    setRecipeName(inputValue);
  };

  const handleIngredientAdd = () => {
    setIngredientList([...ingredientList, { ingredientName: "", quantity: "", unit: "" }]);
  };

  const handleIngredientRemove = (index) => {
    const list = [...ingredientList];
    list.splice(index, 1);
    setIngredientList(list);
  };

  const handleIngredientChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...ingredientList];
    list[index][name] = value;
    setIngredientList(list);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let recipe = { recipeName, ingredientList };
    console.log(recipe);
  };

  return (
    <>
      <h2>Add A Recipe</h2>
      <Form>
        <Row className="align-items-center">
          <Col sm={3} className="my-1">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control placeholder="Recipe Name" value={recipeName || ""} onChange={handleRecipeNameChange} />
          </Col>
        </Row>
      </Form>
      <Form.Label>Ingredient List</Form.Label>
      {ingredientList.map((singleIngredient, index) => (
        <Form key={index}>
          <Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Control name="ingredientName" placeholder="Ingredient" value={singleIngredient.ingredientName || ""} onChange={(event) => handleIngredientChange(event, index)} />
            </Col>
            <Col sm={3} className="my-1">
              <InputGroup>
                <Form.Control name="quantity" placeholder="Quantity" value={singleIngredient.quantity || ""} onChange={(event) => handleIngredientChange(event, index)} />
              </InputGroup>
            </Col>
            <Col sm={3} className="my-1">
              <InputGroup>
                <Form.Control name="unit" placeholder="Unit" value={singleIngredient.unit || ""} onChange={(event) => handleIngredientChange(event, index)} />
              </InputGroup>{" "}
            </Col>
            <Col xs="auto" className="my-1">
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
        </Form>
      ))}

      <Row>
        <Col className="my-1">
          <Button type="submit" onClick={handleFormSubmit}>
            Save Recipe
          </Button>
        </Col>
      </Row>
    </>
  );
}
