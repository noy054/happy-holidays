import React from "react";
import "./Button.css";

const ButtonComponenet = (props) => {
  return (
    <button onClick={() => props.onClick} className={props.classNameForButton}>
      {props.buttonText}
    </button>
  );
};

export default ButtonComponenet;
