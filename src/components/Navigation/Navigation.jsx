import { NavLink } from "react-router-dom";
import css from "./styles.module.css";
import clsx from "clsx";
export default function Navigation() {
  return (
    <nav>
      <ul className={css.navigation}>
        <li className={css.link}>
          <NavLink
            to="/"
            className={(params) => {
              return clsx(css.navLink, params.isActive && css.active);
            }}
          >
            Home
          </NavLink>
        </li>
        <li className={css.link}>
          <NavLink
            to="/movies"
            className={(params) => {
              return clsx(css.navLink, params.isActive && css.active);
            }}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
