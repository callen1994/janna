import React from "react";
import "./dropdown.css";
const DropDown = (props) => {
  return (
    <div className="blueInput">
      <span>{props.label}</span>
      <select onChange={(e) => props.onChange(e.target.value)}>
        {props.values.map((v, i) => (
          <option key={i} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
