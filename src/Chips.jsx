import { useState } from "react";
import "./styles.css";

const Chips = ({ chip, ind, removeChip }) => {
  return (
    <div key={ind} className="chips">
      {chip}
      <button onClick={() => removeChip(ind)} className="chipbtn">
        X
      </button>
    </div>
  );
};

const InputChips = () => {
  const [inp, setInp] = useState();
  const [chips, setChips] = useState([]);

  const removeChip = (ind) => {
    const newArr = [...chips];
    newArr.splice(ind, 1);
    setChips(newArr);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inp.trim()) {
      setChips((prev) => [...prev, inp]);
      setInp("");
    }
  };

  return (
    <div>
      <h3>Add new chips</h3>
      <input
        value={inp}
        onChange={(e) => setInp(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div style={{ display: "flex" }}>
        {chips &&
          chips.map((input, ind) => (
            <Chips ind={ind} chip={input} removeChip={removeChip} />
          ))}
      </div>
    </div>
  );
};

export default InputChips;
