import styles from "./page.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <Header />
      <main className={styles.mainContent}>
        {/* Main content will go here later */}
      </main>
    </div>
  );
}
