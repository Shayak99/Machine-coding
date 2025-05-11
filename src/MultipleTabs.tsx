import React, { useState } from "react";
import "./styles.css";

const tabsConfig = [
  { title: "Personal Info", fields: ["Name", "Email"] },
  { title: "Address", fields: ["City", "State"] },
  { title: "Payment", fields: ["Card number", "CVV", "Expiry Date"] },
  { title: "Hobbies", fields: ["Creative", "Healthy"] },
];

const Tabform = ({ fields, formData, onChange }) => {
  return (
    <form>
      {fields.map((field, ind) => {
        return (
          <div key={ind}>
            <label>{field}</label>
            <input
              value={formData[field] || ""}
              onChange={onChange}
              name={field}
            />
          </div>
        );
      })}
    </form>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formStates, setFormStates] = useState(tabsConfig.map(() => ({})));

  const handleChange = (e, ind) => {
    const { name, value } = e;
    const newFormStates = [...formStates];
    newFormStates[ind] = {
      ...newFormStates[ind],
      [name]: value,
    };

    setFormStates(newFormStates);
  };

  return (
    <div className="container">
      <div className="header">
        {tabsConfig.map((tab, ind) => (
          <button
            onClick={() => setActiveTab(ind)}
            className={`tab-btn ${ind === activeTab ? "active" : ""}`}
            key={tab.title}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="content">
        <Tabform
          fields={tabsConfig[activeTab].fields}
          formData={formStates[activeTab]}
          onChange={(e) => handleChange(e, activeTab)}
        />
      </div>
    </div>
  );
};

export default Tabs;
