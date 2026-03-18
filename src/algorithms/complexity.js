export const SORT_COMPLEXITY = {
  bubble:    { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true,  description: "Repeatedly swaps adjacent elements if out of order. Simple but inefficient for large inputs." },
  insertion: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true,  description: "Builds sorted array one element at a time. Efficient for nearly-sorted data." },
  merge:     { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: true,  description: "Divide and conquer — splits array, sorts halves, merges. Guaranteed O(n log n)." },
  quick:     { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: false, description: "Picks a pivot, partitions array around it, recurses. Fast in practice despite worst-case O(n²)." },
};

export const PATH_COMPLEXITY = {
  bfs:      { time: "O(V + E)", space: "O(V)", shortest: true,  description: "Explores level by level. Guarantees shortest path on unweighted graphs." },
  dfs:      { time: "O(V + E)", space: "O(V)", shortest: false, description: "Explores as deep as possible before backtracking. Does not guarantee shortest path." },
  dijkstra: { time: "O((V + E) log V)", space: "O(V)", shortest: true,  description: "Greedy shortest path with priority queue. Optimal for weighted graphs." },
  astar:    { time: "O((V + E) log V)", space: "O(V)", shortest: true,  description: "Dijkstra + heuristic (Manhattan distance). Finds shortest path faster by guiding search toward the goal." },
};
