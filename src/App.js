import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import ShoppingList from "./pages/ShoppingList";
import Login from "./pages/Login";
import RecipeCreate from "./pages/RecipeCreate";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/recipelist" element={<RecipeList />} />
        <Route exact path="/recipecreate" element={<RecipeCreate />} />
        <Route exact path="/shoppinglist" element={<ShoppingList />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
