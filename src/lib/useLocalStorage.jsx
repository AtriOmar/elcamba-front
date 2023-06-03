// import { useEffect, useState } from "react";

// const PREFIX = "charyoul-";

// export default function useLocalStorage(key, initialValue) {
//   const prefixedKey = PREFIX + key;
//   const [value, setValue] = useState(() => {
//     const jsonValue = localStorage.getItem(prefixedKey);
//     if (jsonValue != null) return JSON.parse(jsonValue);
//     if (typeof initialValue === "function") {
//       return initialValue();
//     } else {
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(prefixedKey, JSON.stringify(value));
//     console.log(value);
//   }, [prefixedKey, value]);

//   return [value, setValue];
// }

import { useState } from "react";

const PREFIX = "charyoul-";

const useLocalStorage = (key, defaultValue) => {
  // Create state variable to store
  // localStorage value in state
  const prefixedKey = PREFIX + key;
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(prefixedKey);
      // If value is already present in
      // localStorage then return it

      // Else set default value in
      // localStorage and then return it
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(prefixedKey, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(prefixedKey, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (valueOrFn) => {
    let newValue;
    if (typeof valueOrFn === "function") {
      const fn = valueOrFn;
      newValue = fn(localStorageValue);
    } else {
      newValue = valueOrFn;
    }
    localStorage.setItem(prefixedKey, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
