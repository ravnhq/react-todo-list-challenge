import { NavLink } from "react-router-dom";
import styles from "./sidebar-links.module.css";

interface Link {
  link: string;
  icon: JSX.Element;
  label: string;
}

interface SidebarLinksProps {
  links: Link[];
}

export default function SidebarLinks({ links }: SidebarLinksProps) {
  return (
    <ul className={styles.container}>
      {links.map((link) => (
        <NavLink to={link.link}>
          <li className="" key={link.link}>
            {link.icon}
            {link.label}
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
