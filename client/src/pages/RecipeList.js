import React from "react";
import Button from "react-bootstrap/Button";

export default function RecipeList() {
  return (
    <>
      <h2>Recipe List</h2>
      <div className="d-grid gap-2">
        <Button href="/#/recipecreate" variant="primary" size="lg">
          Add Recipe
        </Button>
      </div>
    </>
  );
}
