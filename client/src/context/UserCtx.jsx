import { useEffect, useContext, createContext, useReducer } from "react";
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
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case ACTIONS.LOGIN:
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case ACTIONS.LOGOUT:
      sessionStorage.removeItem("user");
      return { ...state, user: null };

    default:
      return { ...state };
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    loading: false,
    error: null,
    user: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    //on page reload: persist logged user, if exists:
    const userStr = sessionStorage.getItem("user");
    if (!userStr) return;
    const user = JSON.parse(userStr);
    dispatch({ type: ACTIONS.LOGIN, payload: user });
  }, []);

  return <ctx.Provider value={{ state, dispatch }}>{children}</ctx.Provider>;
};
