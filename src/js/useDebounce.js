import { useState, useEffect } from "react";

const useDebounce = (value, debounceTime = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [value]);
  return debounceValue;
};

export default useDebounce;
