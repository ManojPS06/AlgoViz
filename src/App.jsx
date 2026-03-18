import { useState, useRef } from "react";
import SortVisualizer from "./components/SortVisualizer";
import PathVisualizer from "./components/PathVisualizer";
import styles from "./App.module.css";

export default function App() {
  const [tab, setTab] = useState("sort");

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span className={styles.logo}>AlgoViz</span>
        <div className={styles.tabs}>
          {["sort", "path"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={tab === t ? styles.activeTab : styles.tab}
            >
              {t === "sort" ? "Sorting" : "Pathfinding"}
            </button>
          ))}
        </div>
      </header>
      {tab === "sort" ? <SortVisualizer /> : <PathVisualizer />}
    </div>
  );
}
