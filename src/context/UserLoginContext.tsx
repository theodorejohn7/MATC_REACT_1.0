import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useShoppingCart } from "./ShoppingCartContext";

import { isRefTokenExpired } from "../axios/instance";

type UserContextProviderProps = {
  children: ReactNode;
};

type UserContextType = {
  currentUser: string;
  isLoggedin: boolean;
  notLoggedIn: boolean;
  isAdmin: boolean;
  login: (arg0: string) => void;
  logout: () => void;
  setNotLoggedinPopup: () => void;
  checkAdmin: (arg0: string) => void;
};

const UserLoginContext = createContext({} as UserContextType);

export function useUserLoginContext() {
  return useContext(UserLoginContext);
}

export function UserloginContextProvider({
  children,
}: UserContextProviderProps) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const { resetCart } = useShoppingCart();

  const [currentUser, setCurrentUser] = useState("");
  const ADMIN_USER = process.env.REACT_APP_ADMIN_USER;

  function login(user: string) {
    setCurrentUser(user);
    setIsLoggedin(true);
  }

  function checkAdmin(user: string) {
    if (user === ADMIN_USER) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  function setNotLoggedinPopup() {
    setNotLoggedIn(!notLoggedIn);
  }

  function logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    resetCart();
    setCurrentUser("");
    setIsAdmin(false);
    setIsLoggedin(false);
  }

  useEffect(() => {
    if (isRefTokenExpired) {
      console.log("logging out as token expired")
      logout();
    }
  }, [isRefTokenExpired]);

  return (
    <UserLoginContext.Provider
      value={{
        isLoggedin,
        checkAdmin,
        setNotLoggedinPopup,
        notLoggedIn,
        currentUser,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
}
