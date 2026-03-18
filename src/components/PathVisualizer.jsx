import { useState, useRef } from "react";
import { bfs, dfs, dijkstra, astar, ROWS, COLS } from "../algorithms/pathfinding";
import { PATH_COMPLEXITY } from "../algorithms/complexity";
import { PathComplexityPanel } from "./ComplexityPanel";
import styles from "./PathVisualizer.module.css";

const ALGOS = { bfs, dfs, dijkstra, astar };
const START = "7-3";
const END = "7-26";

const cellColor = (key, walls, visited, pathResult) => {
  if (key === START) return "#2563eb";
  if (key === END) return "#ef4444";
  if (walls.has(key)) return "#1e293b";
  if (pathResult && pathResult.includes(key)) return "#10b981";
  if (visited.has(key)) return "#60a5fa";
  return "#1e3a5f";
};

export default function PathVisualizer() {
  const [algo, setAlgo] = useState("bfs");
  const [walls, setWalls] = useState(new Set());
  const [visited, setVisited] = useState(new Set());
  const [pathResult, setPathResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const timerRef = useRef(null);

  function stop() { if (timerRef.current) clearTimeout(timerRef.current); setRunning(false); }
  function reset() { stop(); setVisited(new Set()); setPathResult(null); }
  function clear() { reset(); setWalls(new Set()); }

  function toggleWall(key) {
    if (key === START || key === END) return;
    setWalls((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }

  function run() {
    reset();
    const frames = ALGOS[algo](walls, START, END);
    setRunning(true);
    let i = 0;
    const step = () => {
      if (i >= frames.length) { setRunning(false); return; }
      const f = frames[i++];
      setVisited(f.visited);
      if (f.path !== null) setPathResult(f.path);
      timerRef.current = setTimeout(step, 16);
    };
    step();
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.algoRow}>
          {Object.keys(ALGOS).map((a) => (
            <button key={a} onClick={() => { setAlgo(a); reset(); }}
              className={algo === a ? styles.activeAlgo : styles.algoBtn}>
              {a === "astar" ? "A*" : a.toUpperCase()}
            </button>
          ))}
        </div>
        <span className={styles.hint}>Click or drag to draw walls</span>
        <button className={styles.clearBtn} onClick={clear}>Clear</button>
        <button className={styles.resetBtn} onClick={reset}>Reset Path</button>
        <button className={running ? styles.stopBtn : styles.runBtn} onClick={running ? stop : run}>
          {running ? "Stop" : "Visualise"}
        </button>
        {pathResult && (
          <span className={pathResult.length ? styles.pathFound : styles.noPath}>
            {pathResult.length ? `✓ Path: ${pathResult.length} steps` : "✗ No path found"}
          </span>
        )}
      </div>

      <PathComplexityPanel
        algo={algo}
        complexity={PATH_COMPLEXITY[algo]}
        visitedCount={visited.size}
        pathLength={pathResult ? (pathResult.length || null) : null}
      />

      <div className={styles.legend}>
        {[["Start", "#2563eb"], ["End", "#ef4444"], ["Wall", "#1e293b"], ["Visited", "#60a5fa"], ["Path", "#10b981"]].map(([l, c]) => (
          <div key={l} className={styles.legendItem}>
            <div className={styles.dot} style={{ background: c, border: c === "#1e293b" ? "1px solid #334155" : "none" }} />
            <span>{l}</span>
          </div>
        ))}
      </div>

      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }} onMouseLeave={() => setDrawing(false)}>
        {Array.from({ length: ROWS }, (_, r) =>
          Array.from({ length: COLS }, (_, c) => {
            const key = `${r}-${c}`;
            return (
              <div key={key} className={styles.cell}
                style={{ background: cellColor(key, walls, visited, pathResult) }}
                onMouseDown={() => { setDrawing(true); toggleWall(key); reset(); }}
                onMouseEnter={() => { if (drawing) { toggleWall(key); reset(); } }}
                onMouseUp={() => setDrawing(false)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
