import { useState, useEffect, useRef } from "react";
import { bubbleSort, insertionSort, mergeSort, quickSort } from "../algorithms/sorting";
import { SORT_COMPLEXITY } from "../algorithms/complexity";
import { SortComplexityPanel } from "./ComplexityPanel";
import styles from "./SortVisualizer.module.css";

const ALGOS = { bubble: bubbleSort, insertion: insertionSort, merge: mergeSort, quick: quickSort };
const COLORS = { default: "#334155", compare: "#f59e0b", swap: "#ef4444", sorted: "#10b981", pivot: "#8b5cf6" };

function genArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

export default function SortVisualizer() {
  const [size, setSize] = useState(40);
  const [speed, setSpeed] = useState(50);
  const [algo, setAlgo] = useState("bubble");
  const [arr, setArr] = useState(() => genArray(40));
  const [highlights, setHighlights] = useState({});
  const [allSorted, setAllSorted] = useState(false);
  const [running, setRunning] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => { stop(); setArr(genArray(size)); setHighlights({}); setAllSorted(false); setComparisons(0); setSwaps(0); }, [size]);

  function stop() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRunning(false);
  }

  function shuffle() {
    stop();
    setArr(genArray(size));
    setHighlights({});
    setAllSorted(false);
    setComparisons(0);
    setSwaps(0);
  }

  function run() {
    stop();
    setAllSorted(false);
    setComparisons(0);
    setSwaps(0);
    const frames = ALGOS[algo](arr);
    setRunning(true);
    let i = 0, cmp = 0, sw = 0;
    const step = () => {
      if (i >= frames.length) { setRunning(false); setAllSorted(true); setHighlights({}); return; }
      const f = frames[i++];
      const vals = Object.values(f.highlights || {});
      if (vals.includes("compare")) { cmp++; setComparisons(cmp); }
      if (vals.includes("swap")) { sw++; setSwaps(sw); }
      setArr(f.arr);
      setHighlights(f.highlights || {});
      if (f.allSorted) setAllSorted(true);
      timerRef.current = setTimeout(step, Math.max(4, 200 - speed * 1.95));
    };
    step();
  }

  const barColor = (i) => {
    if (allSorted) return COLORS.sorted;
    return COLORS[highlights[i]] || COLORS.default;
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.algoRow}>
          {Object.keys(ALGOS).map((a) => (
            <button key={a} onClick={() => { setAlgo(a); stop(); setHighlights({}); setAllSorted(false); setComparisons(0); setSwaps(0); }}
              className={algo === a ? styles.activeAlgo : styles.algoBtn}>
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          ))}
        </div>
        <label className={styles.sliderLabel}>
          Size
          <input type="range" min={10} max={100} value={size} onChange={(e) => setSize(+e.target.value)} />
          <span>{size}</span>
        </label>
        <label className={styles.sliderLabel}>
          Speed
          <input type="range" min={1} max={100} value={speed} onChange={(e) => setSpeed(+e.target.value)} />
        </label>
        <button className={styles.shuffleBtn} onClick={shuffle} disabled={running}>Shuffle</button>
        <button className={running ? styles.stopBtn : styles.runBtn} onClick={running ? stop : run}>
          {running ? "Stop" : "Sort"}
        </button>
      </div>

      <SortComplexityPanel algo={algo} complexity={SORT_COMPLEXITY[algo]} comparisons={comparisons} swaps={swaps} />

      <div className={styles.legend}>
        {Object.entries(COLORS).filter(([k]) => k !== "default").map(([k, c]) => (
          <div key={k} className={styles.legendItem}>
            <div className={styles.dot} style={{ background: c }} />
            <span>{k.charAt(0).toUpperCase() + k.slice(1)}</span>
          </div>
        ))}
      </div>

      <div className={styles.canvas}>
        {arr.map((v, i) => (
          <div key={i} className={styles.bar} style={{ height: `${v * 3}px`, background: barColor(i) }} title={v} />
        ))}
      </div>
    </div>
  );
}
