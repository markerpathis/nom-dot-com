import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ButtonComp from "../components/ButtonComp";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

export default function RecipeListPublic({ setRecipeId }) {
  const [recipeList, setRecipeList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  console.log(recipeList);

  //   const authCheck = () => {
  //     if (Auth.loggedIn() === false) {
  //       navigate("/login");
  //     } else {
  //       return;
  //     }
  //   };

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
    // authCheck();
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
      </Container>
    </div>
  );
}