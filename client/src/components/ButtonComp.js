import React from "react";
import Button from "react-bootstrap/Button";

export default function ButtonComp({ label, handleClick, width = "150px" }) {
  const styles = {
    button: {
      width: width,
      backgroundColor: "#FFCB77",
    },
  };
  return (
    <Button style={styles.button} className="buttonHover text-dark border-0" onClick={handleClick}>
      {label}
    </Button>
  );
}
