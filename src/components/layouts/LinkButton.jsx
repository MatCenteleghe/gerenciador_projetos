import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

function LinkButton({ to, text, target }) {
  return (
    <Link className={styles.btn} target={target} to={to}>
      {text}
    </Link>
  );
}
export default LinkButton;
