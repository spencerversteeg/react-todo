import { Dispatch, useEffect, useState } from "react";

export const useSavedState = (
  defaultValue: unknown,
  key: string
): [any, Dispatch<any>] => {
  const [value, setValue] = useState(() => {
    const savedValue = window.localStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
