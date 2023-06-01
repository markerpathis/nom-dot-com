import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ButtonComp from "../components/ButtonComp";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

export default function RecipeList({ setRecipeId }) {
  const [recipeList, setRecipeList] = useState([]);
  const [search, setSearch] = useState("");
  const userId = Auth.getId();
  const navigate = useNavigate();

  const getRecipes = () => {
    console.log(userId);
    axios
      .get(`https://nomdotcom.herokuapp.com/api/recipeCollection/${userId}`)
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
            <td>
              <a className="text-dark" href={`/#/recipeview/${recipe._id}`} onClick={() => setRecipeId(recipe._id)}>
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
        <h2 className="pt-3 border-bottom border-dark border-2">Recipe List</h2>
        {recipeList.length > 0 && (
          <Form className="pt-3 pb-3">
            <Form.Group>
              <Form.Control onChange={(event) => setSearch(event.target.value)} type="text" placeholder="Search for a recipe" />
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
        <div className="d-grid gap-2">
          <ButtonComp label={"Add Recipe"} handleClick={() => navigate("/recipecreate")}></ButtonComp>
        </div>
      </Container>
    </div>
  );
}
