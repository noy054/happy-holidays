import React from "react";
import "./DisplayText.css";

const TextContainer = (props) => {
  return (
    <div className="text-container">
      <h4 className="total">{props.total}</h4>
      <h4 className="text">{props.text}</h4>
    </div>
  );
};

export default TextContainer;
