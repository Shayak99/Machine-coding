import { useState, useEffect, useRef } from "react";
import "./styles.css";

const SIZE = 5;

const OTP = () => {
  const [inputArr, setInputArr] = useState(new Array(SIZE).fill());

  const otpRef = useRef({});

  const handleChange = (value, ind) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[ind] = newValue.slice(-1);
    setInputArr(newArr);

    newValue && otpRef.current[ind + 1]?.focus();
  };

  const handleKeyDown = (event, ind) => {
    if (event.key === "Backspace" && !event.target.value) {
      otpRef.current[ind - 1]?.focus();
    }
  };

  useEffect(() => {
    otpRef.current[0]?.focus();
  }, []);

  return (
    <div>
      {inputArr.map((inp, ind) => {
        return (
          <input
            key={ind}
            className="otp"
            onChange={(e) => handleChange(e.target.value, ind)}
            value={inp}
            ref={(input) => (otpRef.current[ind] = input)}
            onKeyDown={(e) => handleKeyDown(e, ind)}
          />
        );
      })}
    </div>
  );
};

export default OTP;
