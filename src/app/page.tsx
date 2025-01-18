import styles from "./page.module.css";
import MainPage from "./ui/main-page";

export default function Home() {
  return (
    <div className={styles.page}>
      <MainPage/>
    </div>
  );
}
