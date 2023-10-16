import { useState } from 'react';

export const useLocalStorage = <Type>(
  key: string,
  initialValue: Type,
): [Type, (newValue: Type) => void] => {
  const [value, setValue] = useState(() => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value) as Type;
    }
    return initialValue;
  });

  const setValueAndSave = (newValue: Type): void => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setValueAndSave];
};
