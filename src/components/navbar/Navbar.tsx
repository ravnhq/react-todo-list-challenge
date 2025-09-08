import styles from "./navbar.module.scss";
import { useTaskManager } from "../../store/useTaskManager";
import { Search } from "lucide-react";

export const Navbar = () => {
  const { searchTerm, setSearchTerm } = useTaskManager();

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.inputSearchContainer}>
        <label htmlFor="searchStore" className={styles.visuallyHidden}>
          Search
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search..."
          className={styles.homeInput}
        />
        <Search className={styles.iconSearch} />
      </div>
    </div>
  );
};
