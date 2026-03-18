export function bubbleSort(arr) {
  const frames = [], a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      frames.push({ arr: [...a], highlights: { [j]: "compare", [j + 1]: "compare" } });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        frames.push({ arr: [...a], highlights: { [j]: "swap", [j + 1]: "swap" } });
      }
    }
  }
  frames.push({ arr: [...a], highlights: {}, allSorted: true });
  return frames;
}

export function insertionSort(arr) {
  const frames = [], a = [...arr];
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      frames.push({ arr: [...a], highlights: { [j]: "compare", [j - 1]: "compare" } });
      [a[j], a[j - 1]] = [a[j - 1], a[j]];
      frames.push({ arr: [...a], highlights: { [j]: "swap", [j - 1]: "swap" } });
      j--;
    }
  }
  frames.push({ arr: [...a], highlights: {}, allSorted: true });
  return frames;
}

export function mergeSort(arr) {
  const frames = [], a = [...arr];
  function ms(a, l, r) {
    if (r - l <= 1) return;
    const m = Math.floor((l + r) / 2);
    ms(a, l, m);
    ms(a, m, r);
    const left = a.slice(l, m), right = a.slice(m, r);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      frames.push({ arr: [...a], highlights: { [l + i]: "compare", [m + j]: "compare" } });
      if (left[i] <= right[j]) a[k++] = left[i++];
      else a[k++] = right[j++];
      frames.push({ arr: [...a], highlights: { [k - 1]: "swap" } });
    }
    while (i < left.length) { a[k++] = left[i++]; frames.push({ arr: [...a], highlights: { [k - 1]: "sorted" } }); }
    while (j < right.length) { a[k++] = right[j++]; frames.push({ arr: [...a], highlights: { [k - 1]: "sorted" } }); }
  }
  ms(a, 0, a.length);
  frames.push({ arr: [...a], highlights: {}, allSorted: true });
  return frames;
}

export function quickSort(arr) {
  const frames = [], a = [...arr];
  function qs(a, l, r) {
    if (l >= r) return;
    const pivot = a[r];
    frames.push({ arr: [...a], highlights: { [r]: "pivot" } });
    let i = l;
    for (let j = l; j < r; j++) {
      frames.push({ arr: [...a], highlights: { [j]: "compare", [r]: "pivot" } });
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        frames.push({ arr: [...a], highlights: { [i]: "swap", [j]: "swap", [r]: "pivot" } });
        i++;
      }
    }
    [a[i], a[r]] = [a[r], a[i]];
    frames.push({ arr: [...a], highlights: { [i]: "sorted" } });
    qs(a, l, i - 1);
    qs(a, i + 1, r);
  }
  qs(a, 0, a.length - 1);
  frames.push({ arr: [...a], highlights: {}, allSorted: true });
  return frames;
}
