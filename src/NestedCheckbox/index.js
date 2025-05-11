import React, { useState, useEffect, useRef } from "react";
import data from "./data.json";

function NestedCheckboxes() {
  const [checkedMap, setCheckedMap] = useState({});

  const updateChildState = (node, checked, map) => {
    map[node.id] = checked;
    if (node.children) {
      for (let child of node.children) {
        updateChildState(child, checked, map);
      }
    }
  };

  const updateParentState = (data, map) => {
    const checkParent = (node) => {
      if (!node.children) return map[node.id];
      const childrenStates = node.children.map(checkParent);
      const allTrue = childrenStates.every(Boolean);
      const allFalse = childrenStates.every((val) => val === false);
      map[node.id] = allTrue ? true : allFalse ? false : "indeterminate";
      return map[node.id] === true;
    };
    data.forEach(checkParent);
  };

  const handleChange = (node, checked) => {
    const newMap = { ...checkedMap };
    updateChildState(node, checked, newMap);
    updateParentState(data, newMap);
    setCheckedMap(newMap);
  };

  const Checkbox = ({ node }) => {
    const checkboxRef = useRef();

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate =
          checkedMap[node.id] === "indeterminate";
      }
    }, [checkedMap[node.id]]);

    return (
      <div style={{ marginLeft: 20 }}>
        <label>
          <input
            type="checkbox"
            ref={checkboxRef}
            checked={checkedMap[node.id] === true}
            onChange={(e) => handleChange(node, e.target.checked)}
          />
          {node.label}
        </label>
        {node.children &&
          node.children.map((child) => (
            <Checkbox key={child.id} node={child} />
          ))}
      </div>
    );
  };

  useEffect(() => {
    const initMap = {};
    data.forEach((node) => updateChildState(node, false, initMap));
    setCheckedMap(initMap);
  }, [data]);

  return (
    <div>
      {data.map((node) => (
        <Checkbox key={node.id} node={node} />
      ))}
    </div>
  );
}

export default NestedCheckboxes;
