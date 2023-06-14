import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function RecipeListPublic({ setRecipeId }) {
  const [recipeList, setRecipeList] = useState([]);
  const [search, setSearch] = useState("");
  const [recipeFilters, setRecipeFilters] = useState({ filterCuisine: "", filterDishType: "" });

  const getRecipes = () => {
    let recipeApiUrl = "";
    if (process.env.NODE_ENV === "production") {
      recipeApiUrl = `https://nomdotcom.herokuapp.com/api/recipes/public`;
    } else {
      recipeApiUrl = `http://localhost:3001/api/recipes/public`;
    }
    axios
      .post(recipeApiUrl)
      .then((data) => {
        setRecipeList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleFilterChange = (event) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputType === "cuisine") {
      setRecipeFilters({ ...recipeFilters, filterCuisine: inputValue });
    } else if (inputType === "dishType") {
      setRecipeFilters({ ...recipeFilters, filterDishType: inputValue });
    } else {
      return;
    }
  };

  const populateRecipeData = () => {
    return recipeList
      .filter((searchInput) => {
        return search === "" ? searchInput : searchInput.recipeName.toLowerCase().includes(search.toLocaleLowerCase());
      })
      .filter((searchInput) => {
        return recipeFilters.filterCuisine === "" ? searchInput : searchInput.tagCuisine.includes(recipeFilters.filterCuisine);
      })
      .filter((searchInput) => {
        return recipeFilters.filterDishType === "" ? searchInput : searchInput.tagDishType.includes(recipeFilters.filterDishType);
      })
      .map((recipe, index) => {
        return (
          <tr key={index}>
            <td>
              <a className="text-dark" href={`/recipeview/${recipe._id}`} onClick={() => setRecipeId(recipe._id)}>
                {recipe.recipeName}
              </a>
            </td>
          </tr>
        );
      });
  };

  return (
    <div style={{ background: "#fef9ef" }} className="pt-4">
      <Container>
        <h2 className="pt-3 border-bottom border-dark border-2">Recipes</h2>
        <div className="pt-1">Recipes in this list have been shared by other users.</div>
        {recipeList.length > 0 && (
          <Form className="pt-3 pb-3">
            <Form.Group>
              <Row>
                <Col>
                  <Form.Control onChange={(event) => setSearch(event.target.value)} type="text" placeholder="Search for a recipe" />
                </Col>
                <Col>
                  <Form.Select name="cuisine" onChange={handleFilterChange}>
                    <option value="">Filter by cuisine</option>
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
                </Col>
                <Col>
                  <Form.Select name="dishType" onChange={handleFilterChange}>
                    <option value="">Filter by dish type</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Cocktail">Cocktail</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Drink">Drink</option>
                    <option value="Entree">Entree</option>
                    <option value="Side Dish">Side Dish</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        )}
        {recipeList.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Recipe Name</th>
              </tr>
            </thead>
            {recipeList ? (
              <tbody>{populateRecipeData()}</tbody>
            ) : (
              <tbody>
                <tr>
                  <td>loading</td>
                </tr>
              </tbody>
            )}
          </Table>
        )}
      </Container>
    </div>
  );
}
