import { useReducer } from "react";
import { useEffect, useContext, createContext } from "react";
const ctx = createContext();
export const useAuth = () => useContext(ctx);
export const ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  REGISTER: "register",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.REGISTER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case ACTIONS.LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case ACTIONS.LOGOUT:
      localStorage.removeItem("user");
      return { ...state, user: null };

    default:
      return { ...state };
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    loading: false,
    error: null,
    token: "",
  };
  useEffect(() => {
    //on page reload: persist logged user, if exists:
    const userStr = sessionStorage.getItem("user");
    if (!userStr) return;
    const user = JSON.parse(userStr);
    dispatch({ type: ACTIONS.LOGIN, payload: user });
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  return <ctx.Provider value={{ state, dispatch }}>{children}</ctx.Provider>;
};
