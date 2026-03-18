# AlgoViz — Algorithm Visualizer

An interactive web app to visualise sorting and pathfinding algorithms with live complexity tracking. Built with React and Vite.

## Features

### Sorting Algorithms
- **Bubble Sort** — compare and swap adjacent elements
- **Insertion Sort** — build sorted array one element at a time
- **Merge Sort** — divide and conquer recursive sorting
- **Quick Sort** — pivot-based partitioning

Live stats: comparisons and swaps update in real time as the algorithm runs.

### Pathfinding Algorithms
- **BFS** — Breadth-First Search (guaranteed shortest path)
- **DFS** — Depth-First Search (not guaranteed shortest)
- **Dijkstra's** — optimal shortest path with priority queue
- **A\*** — Dijkstra + Manhattan distance heuristic (fastest to goal)

Click or drag on the grid to draw walls. Blue = start, Red = end.

Each algorithm shows its time/space complexity and whether it guarantees the shortest path.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- React 18
- Vite
- CSS Modules
- All algorithms implemented from scratch in vanilla JavaScript — no algorithm libraries used

## Project Structure

```
algo-viz/
├── src/
│   ├── algorithms/
│   │   ├── sorting.js       # Bubble, Insertion, Merge, Quick
│   │   ├── pathfinding.js   # BFS, DFS, Dijkstra, A*
│   │   └── complexity.js    # Time/space complexity metadata
│   ├── components/
│   │   ├── SortVisualizer.jsx
│   │   ├── PathVisualizer.jsx
│   │   └── ComplexityPanel.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Motivation

Built while studying Design & Analysis of Algorithms (DAA) at PES University. Implementing and animating these algorithms from scratch helped solidify understanding of time complexity, recursion, graph traversal, and heuristic search.
