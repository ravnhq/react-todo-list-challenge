import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import { RiAddCircleLine, RiListRadio } from "@remixicon/react";

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>
            <RiListRadio className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link to="/form" className={styles.link}>
            <RiAddCircleLine className={styles.icon} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
