import styles from "./page.module.css";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.mainContent}>
        {/* Main content will go here later */}
      </main>
    </div>
  );
}
