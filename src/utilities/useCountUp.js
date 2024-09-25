import { useState, useEffect } from "react";

const useCountUp = (endValue, duration) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const increment = endValue / (duration / 10);

    const counter = setInterval(() => {
      startValue += increment;
      if (startValue >= endValue) {
        setValue(endValue);
        clearInterval(counter);
      } else {
        setValue(Math.ceil(startValue));
      }
    }, 10);

    return () => clearInterval(counter);
  }, [endValue, duration]);

  return value;
};

export default useCountUp;
