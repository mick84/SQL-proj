import style from "./nav.module.scss";
import { Link, NavLink } from "react-router-dom";
import { ACTIONS, useAuth } from "../../context/UserCtx";
import { useCallback } from "react";
import { API } from "../../misc/api";
export const Nav = (props) => {
  const { state, dispatch } = useAuth();
  //dispatch.bind(null, { type: ACTIONS.LOGOUT })
  console.log(state);
  const logOut = useCallback(async () => {
    try {
      const { data } = await API.get("/auth/logout", {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      console.log(data);
      dispatch({ type: ACTIONS.LOGOUT });
    } catch (error) {
      console.log(error.response.data || error.message);
    }
  }, [dispatch, state.user?.token]);
  return (
    <nav className={style.nav}>
      <Link className={style.logo} to="/">
        My company
      </Link>

      <ul className={style.auth}>
        {state.user ? (
          <button type="reset" onClick={logOut}>
            Log out
          </button>
        ) : (
          <>
            <NavLink to={"/auth/register"}>Register</NavLink>
            <NavLink to={"/auth/login"}>login</NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};
