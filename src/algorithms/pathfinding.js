export const ROWS = 15;
export const COLS = 30;

function neighbors(r, c) {
  return [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]
    .filter(([a, b]) => a >= 0 && a < ROWS && b >= 0 && b < COLS);
}

export function bfs(walls, start, end) {
  const frames = [], visited = new Set([start]);
  const queue = [[start, [start]]];
  while (queue.length) {
    const [node, path] = queue.shift();
    frames.push({ visited: new Set(visited), path: null });
    if (node === end) { frames.push({ visited, path }); return frames; }
    const [r, c] = node.split("-").map(Number);
    for (const [nr, nc] of neighbors(r, c)) {
      const nk = `${nr}-${nc}`;
      if (!visited.has(nk) && !walls.has(nk)) {
        visited.add(nk);
        queue.push([nk, [...path, nk]]);
      }
    }
  }
  frames.push({ visited, path: [] });
  return frames;
}

export function dfs(walls, start, end) {
  const frames = [], visited = new Set();
  function _dfs(node, path) {
    if (visited.has(node)) return false;
    visited.add(node);
    frames.push({ visited: new Set(visited), path: null });
    if (node === end) { frames.push({ visited, path: [...path, node] }); return true; }
    const [r, c] = node.split("-").map(Number);
    for (const [nr, nc] of neighbors(r, c)) {
      const nk = `${nr}-${nc}`;
      if (!walls.has(nk) && _dfs(nk, [...path, node])) return true;
    }
    return false;
  }
  if (!_dfs(start, [])) frames.push({ visited, path: [] });
  return frames;
}

export function astar(walls, start, end) {
  const frames = [];
  const [er, ec] = end.split("-").map(Number);
  const h = (key) => { const [r, c] = key.split("-").map(Number); return Math.abs(r - er) + Math.abs(c - ec); };
  const g = {}, f = {}, prev = {}, visited = new Set();
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) { g[`${r}-${c}`] = Infinity; f[`${r}-${c}`] = Infinity; }
  g[start] = 0; f[start] = h(start);
  const open = new Set([start]);
  while (open.size) {
    let node = [...open].reduce((a, b) => f[a] < f[b] ? a : b);
    open.delete(node);
    visited.add(node);
    frames.push({ visited: new Set(visited), path: null });
    if (node === end) {
      const path = []; let cur = end;
      while (cur) { path.unshift(cur); cur = prev[cur]; }
      frames.push({ visited, path });
      return frames;
    }
    const [r, c] = node.split("-").map(Number);
    for (const [nr, nc] of neighbors(r, c)) {
      const nk = `${nr}-${nc}`;
      if (walls.has(nk) || visited.has(nk)) continue;
      const ng = g[node] + 1;
      if (ng < g[nk]) {
        prev[nk] = node; g[nk] = ng; f[nk] = ng + h(nk);
        open.add(nk);
      }
    }
  }
  frames.push({ visited, path: [] });
  return frames;
}

  const frames = [], dist = {}, prev = {}, visited = new Set();
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      dist[`${r}-${c}`] = Infinity;
  dist[start] = 0;
  const pq = [[0, start]];
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    frames.push({ visited: new Set(visited), path: null });
    if (node === end) {
      const path = []; let cur = end;
      while (cur) { path.unshift(cur); cur = prev[cur]; }
      frames.push({ visited, path });
      return frames;
    }
    const [r, c] = node.split("-").map(Number);
    for (const [nr, nc] of neighbors(r, c)) {
      const nk = `${nr}-${nc}`;
      if (!walls.has(nk) && d + 1 < dist[nk]) {
        dist[nk] = d + 1;
        prev[nk] = node;
        pq.push([d + 1, nk]);
      }
    }
  }
  frames.push({ visited, path: [] });
  return frames;
}
