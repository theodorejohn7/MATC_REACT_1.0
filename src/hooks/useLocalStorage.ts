import { useEffect, useState } from "react";
import {useUserLoginContext} from "../context/UserLoginContext"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  
  const {currentUser} = useUserLoginContext();

  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    
    if(currentUser)
    localStorage.setItem(key, JSON.stringify(value));

  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
