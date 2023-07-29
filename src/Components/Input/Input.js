import React, { useEffect, useState } from "react";
import "./Input.css";

const InputComponent = (props) => {
  return (
    <div className="input-container">
      <h1 className={`main-text ${props.classNameForText}`}>{props.text}</h1>
      <input
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        name={props.name}
        placeholder={props.placeholder}
        className={`input ${props.className}`} // Add a custom class for styling
        style={{ direction: "rtl" }}
        readOnly={props.readOnly}
        onKeyPress={props.onKeyPress}
      ></input>
    </div>
  );
};

export default InputComponent;
