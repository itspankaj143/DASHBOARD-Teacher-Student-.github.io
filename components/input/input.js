import React from "react";
import styles from "./input.module.css";
// Input component that renders an input field with an optional label
const Input = (props) => {
  return (
    <div className={styles.inputcontainer}>
      {props.label && <label>{props.label}</label>}
      <input type="text" {...props} />
    </div>
  );
};

export default Input;
