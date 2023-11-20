function countAndSortInversions(arr) {
  if (arr.length <= 1) {
    return { sortedArray: arr, inversions: 0 };
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const leftResult = countAndSortInversions(left);
  const rightResult = countAndSortInversions(right);
  const mergeResult = mergeAndCountSplitInversions(leftResult.sortedArray, rightResult.sortedArray, arr);

  return {
    sortedArray: mergeResult.sortedArray,
    inversions: leftResult.inversions + rightResult.inversions + mergeResult.inversions,
    samePreferenceElements: mergeResult.samePreferenceElements,
  };
}

function mergeAndCountSplitInversions(left, right, arr) {
  let i = 0;
  let j = 0;
  let inversions = 0;
  const merged = [];
  const samePreferenceElements = [];

  while (i < left.length && j < right.length) {
    if (left[i].preference <= right[j].preference) {
      merged.push(left[i]);

      // Verifica se o elemento manteve sua posição
      if (left[i].preference === arr[merged.length - 1].preference) {
        samePreferenceElements.push(left[i]);
      }

      i++;
    } else {
      // Se o elemento da esquerda é maior, então há inversões com todos os elementos restantes na parte esquerda
      inversions += left.length - i;
      merged.push(right[j]);

      // Verifica se o elemento manteve sua posição
      if (right[j].preference === arr[merged.length - 1].preference) {
        samePreferenceElements.push(right[j]);
      }

      j++;
    }
  }

  while (i < left.length) {
    merged.push(left[i]);

    if (left[i].preference === arr[merged.length - 1].preference) {
      samePreferenceElements.push(left[i]);
    }
    i++;

  }

  while (j < right.length) {
    merged.push(right[j]);

  if (right[j].preference === arr[merged.length - 1].preference) {
    samePreferenceElements.push(right[j]);
  }
  j++;

}

  // Adiciona os elementos restantes (se houver) de ambos os subarrays
  return {
    sortedArray: merged.concat(left.slice(i)).concat(right.slice(j)),
    inversions,
    samePreferenceElements,
  };
}

export default countAndSortInversions;

// Exemplo de aplicação

const games = [
  // { title: "Spider Man 2", genre: "Ação/Aventura", preference: 3 },
  // { title: "DOOM Eternal", genre: "FPS", preference: 2 },
  // { title: "God Of War Ragnarok", genre: "Ação/Aventura", preference: 4 },
  // { title: "Elden Ring", genre: "RPG", preference: 1 },
  // { title: "F1 2023", genre: "Corrida", preference: 5 },
  // { title: "Final Fantasy VII Remake", genre: "RPG", preference: 6 },

  { title: "Spider Man 2", genre: "Ação/Aventura", preference: 1 },
  { title: "DOOM Eternal", genre: "FPS", preference: 2 },
  { title: "God Of War Ragnarok", genre: "Ação/Aventura", preference: 3 },
  { title: "Elden Ring", genre: "RPG", preference: 4 },
  { title: "F1 2023", genre: "Corrida", preference: 5 },
  { title: "Final Fantasy VII Remake", genre: "RPG", preference: 6 },
  { title: "The Witcher 3", genre: "RPG", preference: 7 },
  { title: "GTA V", genre: "Ação/Aventura", preference: 8 },
];

const result = countAndSortInversions(games);
console.log('Número de inversões:', result.inversions);
console.log('Array ordenado:', result.sortedArray);
console.log('Elementos que não mudaram de preferência:', result.samePreferenceElements);
