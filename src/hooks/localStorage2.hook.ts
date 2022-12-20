import { useState, useEffect } from "react";

function getStorageValue(key: any, defaultValue: any) {
	// getting stored value
	const saved:string = localStorage.getItem(key) || '';
	const initial = JSON.parse(saved);
	return initial || defaultValue;
}

const useLocalStorage2 = (key: any, defaultValue: any) => {
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		// storing input name
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};
export default useLocalStorage2;
/*
	usage:
	const [name, setName] = useLocalStorage("name2", "");
	const [checked, setChecked] = useLocalStorage("checked", false);
 */