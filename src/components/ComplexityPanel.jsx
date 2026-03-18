import styles from "./ComplexityPanel.module.css";

export function SortComplexityPanel({ algo, complexity, comparisons, swaps }) {
  if (!complexity) return null;
  return (
    <div className={styles.panel}>
      <div className={styles.live}>
        <div className={styles.stat}>
          <span className={styles.val}>{comparisons.toLocaleString()}</span>
          <span className={styles.label}>Comparisons</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.val}>{swaps.toLocaleString()}</span>
          <span className={styles.label}>Swaps</span>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.complexityRow}>
          <span className={styles.tag}>Best</span><code>{complexity.best}</code>
          <span className={styles.tag}>Avg</span><code>{complexity.average}</code>
          <span className={styles.tag}>Worst</span><code>{complexity.worst}</code>
          <span className={styles.tag}>Space</span><code>{complexity.space}</code>
          <span className={complexity.stable ? styles.yes : styles.no}>{complexity.stable ? "Stable" : "Unstable"}</span>
        </div>
        <p className={styles.desc}>{complexity.description}</p>
      </div>
    </div>
  );
}

export function PathComplexityPanel({ algo, complexity, visitedCount, pathLength }) {
  if (!complexity) return null;
  return (
    <div className={styles.panel}>
      <div className={styles.live}>
        <div className={styles.stat}>
          <span className={styles.val}>{visitedCount.toLocaleString()}</span>
          <span className={styles.label}>Cells Visited</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.val}>{pathLength ?? "—"}</span>
          <span className={styles.label}>Path Length</span>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.complexityRow}>
          <span className={styles.tag}>Time</span><code>{complexity.time}</code>
          <span className={styles.tag}>Space</span><code>{complexity.space}</code>
          <span className={complexity.shortest ? styles.yes : styles.no}>{complexity.shortest ? "Shortest Path ✓" : "Not Shortest ✗"}</span>
        </div>
        <p className={styles.desc}>{complexity.description}</p>
      </div>
    </div>
  );
}
