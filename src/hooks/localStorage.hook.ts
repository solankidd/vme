import { useEffect, useState } from "react";

function UseLocalStorage(key:any,defaultValue:any) {
	const [state, setState] = useState(() => {
		let value;
		try {
			value = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultValue))
		} catch (e) {
			value = defaultValue;
		}
		return value;
	});

	useEffect(
		() => {
			setState(state)
			window.localStorage.setItem(key, JSON.stringify(state));
		},
		[state]
	);

	return [state, setState]
}

/* function getSavedValue(key:any,value:any) {
	const val = window.localStorage.getItem(key) as string;
	const saveValue = JSON.parse(val);
	if(saveValue) return saveValue;
	return value;
}

function UseLocalStorage(key:any, value:any) {
	const [updatedValue, setUpdatedValue] = useState(()=>{
		return getSavedValue(key,value)
	})

	useEffect(()=>{
		window.localStorage.setItem(key, JSON.stringify(updatedValue))
	}, [updatedValue]);

	return [updatedValue, setUpdatedValue];
} */

/* function UseLocalStorage(key:any, initialValue:any) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value:any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
} */

export default UseLocalStorage;