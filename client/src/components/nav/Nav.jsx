import style from "./nav.module.scss";
import { Link, NavLink } from "react-router-dom";
export const Nav = (props) => {
  return (
    <nav className={style.nav}>
      <Link className={style.logo} to="/">
        My company
      </Link>

      <ul className={style.auth}>
        <NavLink to={"/auth/register"}>Register</NavLink>
        <NavLink to={"/auth/login"}>login</NavLink>
      </ul>
    </nav>
  );
};
