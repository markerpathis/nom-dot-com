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
  const [recipeData, setRecipeData] = useState({
    recipeName: "",
    recipeDesc: "",
    ingredients: [{ ingredientDescrip: "" }],
    recipeDirections: [{ directionDescrip: "" }],
    author: "",
    public: false,
    tagCuisine: "",
    tagDishType: "",
  });
  const navigate = useNavigate();
  console.log(recipeData);

  const authCheck = () => {
    if (Auth.loggedIn() === false) {
      navigate("/login");
    } else {
      return;
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  const handleInputChange = (event, index) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputType === "recipeName") {
      setRecipeData({ ...recipeData, recipeName: inputValue });
    } else if (inputType === "recipeDesc") {
      setRecipeData({ ...recipeData, recipeDesc: inputValue });
    } else if (inputType === "cuisine") {
      setRecipeData({ ...recipeData, tagCuisine: inputValue });
    } else if (inputType === "dishType") {
      setRecipeData({ ...recipeData, tagDishType: inputValue });
    } else if (inputType === "public") {
      if (event.target.checked) {
        setRecipeData({ ...recipeData, public: true });
      } else {
        setRecipeData({ ...recipeData, public: false });
      }
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
    const userId = Auth.getId();

    let postApiUrl = "";
    if (process.env.NODE_ENV === "production") {
      postApiUrl = "https://nomdotcom.herokuapp.com/api/recipes";
    } else {
      postApiUrl = "http://localhost:3001/api/recipes";
    }
    try {
      await axios.post(postApiUrl, {
        recipeName: recipeData.recipeName,
        recipeDesc: recipeData.recipeDesc,
        ingredients: recipeData.ingredients,
        recipeDirections: recipeData.recipeDirections,
        author: userId,
        public: recipeData.public,
        tagCuisine: recipeData.tagCuisine,
        tagDishType: recipeData.tagDishType,
      });
      navigate("/recipelist");
    } catch (err) {
      console.log(err.response.data);
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
          <Row>
            <Col>
              {" "}
              <Form.Group className="my-1 pb-3">
                <h4>Cuisine</h4>
                <Form.Select name="cuisine" onChange={handleInputChange}>
                  <option value="">Select a cuisine</option>
                  <option value="American">American</option>
                  <option value="British">British</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Greek">Greek</option>
                  <option value="Italian">Italian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Thai">Thai</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group className="my-1 pb-3">
                <h4>Dish Type</h4>
                <Form.Select name="dishType" onChange={handleInputChange}>
                  <option value="">Select a dish type</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Cocktail">Cocktail</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Drink">Drink</option>
                  <option value="Entree">Entree</option>
                  <option value="Side Dish">Side Dish</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="my-1 pb-3">
            <h4>Public Share Settings</h4>
            <Form.Check name="public" type="checkbox" label="Make my recipe public" onChange={handleInputChange} />
            <Form.Text>If you check the box above, your recipe will be visible to all site visitors. This is a great way to share your favorite recipes!</Form.Text>
          </Form.Group>
        </Form>

        <Row>
          <Col className="my-1">
            <ButtonComp label={"Save"} handleClick={postRecipe}></ButtonComp>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
