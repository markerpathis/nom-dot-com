import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export default function RecipeList() {
  const [recipeList, setRecipeList] = useState([]);

  const getRecipes = () => {
    axios
      .get("http://localhost:3001/api/recipes")
      .then((data) => {
        console.log(data.data);
        setRecipeList(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const populateRecipeData = () => {
    return recipeList
      .filter((searchInput) => {
        return search === "" ? searchInput : searchInput.recipeName.toLowerCase().includes(search.toLocaleLowerCase());
      })
      .map((recipe, index) => {
        return (
          <tr key={index}>
            <td>{recipe.recipeName}</td>
          </tr>
        );
      });
  };

  const [search, setSearch] = useState("");

  return (
    <>
      <h2>Recipe List</h2>
      <Container>
        <Form>
          <Form.Group>
            <Form.Control onChange={(event) => setSearch(event.target.value)} type="text" placeholder="Search for a recipe" />
          </Form.Group>
        </Form>
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
        <div className="d-grid gap-2">
          <Button href="/#/recipecreate" variant="primary" size="lg">
            Add Recipe
          </Button>
        </div>
      </Container>
    </>
  );
}
