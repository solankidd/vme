import { useState } from 'react';

export interface StorageTypes {
  value: any;
  setStore: (val: any) => void;
  getStore: (val: any) => string;
  clearStore: () => void;
  clearAllStore: () => void;
}

function UseLocalStorage(key: string, initialValue = null): StorageTypes {
  const prefix = 'ProofPilot-';
  const [storedValue, setStorageValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(prefix + key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
			console.log(error);
      return initialValue;
    }
  });
  
  const setValue = (value: any): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
       const strValue = JSON.stringify(valueToStore);

      setStorageValue(strValue);
      window.localStorage.setItem(prefix + key, strValue);
    } catch (error) {
			console.log(error);
		}
  };

	const getValue = (key: any): any => {
    try {
			const val = window.localStorage.getItem('ProofPilot-' + key) || '';
			return JSON.parse(val)
    } catch (error) {
			console.log(error);
		}
  };

  const clearValue = (): void => {
    try {
      setStorageValue(null);
      window.localStorage.removeItem(prefix + key);
    } catch (error) {
			console.log(error);
		}
  };

  const clearAllValue = (): void => {
    try {
      setStorageValue(null);
      window.localStorage.clear();
    } catch (error) {
			console.log(error);
		}
  };

  return {
      value: storedValue,
      setStore: setValue,
      getStore: getValue,
      clearStore: clearValue,
      clearAllStore: clearAllValue
  };
}

export default UseLocalStorage;