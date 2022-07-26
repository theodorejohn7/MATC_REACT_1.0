import { useEffect, useState } from "react";
import { useUserLoginContext } from "../context/UserLoginContext";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const { currentUser } = useUserLoginContext();

  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });
console.log("value",value)
  useEffect(() => {
    if (currentUser) {
      let key1=`shopping-cart-${currentUser}`
      localStorage.setItem(key1, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
