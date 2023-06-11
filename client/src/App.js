import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import ShoppingList from "./pages/ShoppingList";
import Login from "./pages/Login";
import RecipeCreate from "./pages/RecipeCreate";
import RecipeView from "./pages/RecipeView";
import RecipeEdit from "./pages/RecipeEdit";
import SignUp from "./pages/SignUp";
import RecipeListPublic from "./pages/RecipeListPublic";
import { useState } from "react";
import "./index.css";

function App() {
  const [recipeId, setRecipeId] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/recipelist" element={<RecipeList setRecipeId={setRecipeId} />} />
        <Route exact path="/publiclist" element={<RecipeListPublic setRecipeId={setRecipeId} />} />

        <Route exact path="/recipeview/:recipeId" element={<RecipeView recipeId={recipeId} />} />
        <Route exact path="/recipe-edit/:recipeId" element={<RecipeEdit recipeId={recipeId} />} />

        <Route exact path="/recipecreate" element={<RecipeCreate />} />
        <Route exact path="/shoppinglist" element={<ShoppingList />} />
        <Route exact path="/signup" element={<SignUp />} />

        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
