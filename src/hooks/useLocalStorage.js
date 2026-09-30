import { useEffect, useState } from 'react';
export function useLocalStorage(key, initialValue, validate = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : initialValue;
      return validate(parsed) ? parsed : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Private mode or full storage: keep in-memory state usable. */
    }
  }, [key, value]);
  return [value, setValue];
}
