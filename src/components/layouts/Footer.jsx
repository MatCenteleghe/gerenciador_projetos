import { FaLinkedin, FaGithub } from "react-icons/fa";

import styles from "./Footer.module.css";
import LinkButton from "./LinkButton";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <LinkButton
            to="https://github.com/MatCenteleghe"
            text={<FaGithub />}
            target={"_blank"}
          />
        </li>

        <li>
          <LinkButton
            to="https://www.linkedin.com/in/mateus-centeleghe-4abb4125b/"
            text={<FaLinkedin />}
            target={"_blank"}
          />
        </li>
      </ul>
    </footer>
  );
}
export default Footer;
