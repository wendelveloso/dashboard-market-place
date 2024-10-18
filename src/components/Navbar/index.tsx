import styles from "./Navbar.module.css";
import {
  close,
  store,
  user
} from "../Icons/icons";
import { NavLink, useNavigate } from "react-router-dom";

export function Navbar(): JSX.Element {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return navigate("/");
  }
  return (
    <header className={styles.navbar}>
      <div className={`${styles.navbar__container}`}>
        <NavLink to="/produtos">
          {({ isActive }) => (
            <div className={`${styles.circleBackground} ${isActive ? styles.active : ''}`}>
            <img
              src={store}
              className={`${styles.logoStore} ${isActive ? styles.noZoom : ""}`}
              alt="logo store"
            />
            </div>
          )}
        </NavLink>
        <NavLink to="/perfil">
          {({ isActive }) => (
            <div className={`${styles.circleBackground} ${isActive ? styles.active : ''}`}>
            <img
              src={user}
              className={`${styles.logoUser} ${isActive ? styles.noZoom : ""}`}
              alt="logo user"
            />
            </div>
          )}
        </NavLink>
        <NavLink to="/" className={styles.goToLogin}>
          <img
            src={close}
            onClick={logout}
            className={styles.logoClose}
            alt="logo close"
          />
        </NavLink>
      </div>
    </header>
  );
}



