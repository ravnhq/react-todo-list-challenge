import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar/sidebar";
import styles from "./dashboard-layout.module.css";

export default function DashboardLayout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Outlet />
    </div>
  );
}
