import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="LogoImage"></img>
      </Link>
      <ul className={styles.list}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/projects">Projetos</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
