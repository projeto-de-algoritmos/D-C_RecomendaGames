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
    sameidElements: mergeResult.sameidElements,
  };
}

function mergeAndCountSplitInversions(left, right, arr) {
  let i = 0;
  let j = 0;
  let inversions = 0;
  const merged = [];
  const sameidElements = [];

  while (i < left.length && j < right.length) {
    if (left[i].id <= right[j].id) {
      merged.push(left[i]);

      // Verifica se o elemento manteve sua posição
      if (left[i].id === arr[merged.length - 1].id) {
        sameidElements.push(left[i]);
      }

      i++;
    } else {
      // Se o elemento da esquerda é maior, então há inversões com todos os elementos restantes na parte esquerda
      inversions += left.length - i;
      merged.push(right[j]);

      // Verifica se o elemento manteve sua posição
      if (right[j].id === arr[merged.length - 1].id) {
        sameidElements.push(right[j]);
      }

      j++;
    }
  }

  while (i < left.length) {
    merged.push(left[i]);

    if (left[i].id === arr[merged.length - 1].id) {
      sameidElements.push(left[i]);
    }
    i++;

  }

  while (j < right.length) {
    merged.push(right[j]);

  if (right[j].id === arr[merged.length - 1].id) {
    sameidElements.push(right[j]);
  }
  j++;

}

  // Adiciona os elementos restantes (se houver) de ambos os subarrays
  return {
    sortedArray: merged.concat(left.slice(i)).concat(right.slice(j)),
    inversions,
    sameidElements,
  };
}

export default countAndSortInversions;

// Exemplo de aplicação

const games = [
  // { game: "Spider Man 2", genre: "Ação/Aventura", id: 3 },
  // { game: "DOOM Eternal", genre: "FPS", id: 2 },
  // { game: "God Of War Ragnarok", genre: "Ação/Aventura", id: 4 },
  // { game: "Elden Ring", genre: "RPG", id: 1 },
  // { game: "F1 2023", genre: "Corrida", id: 5 },

  // { game: "Spider Man 2", genre: "Ação/Aventura", id: 1 },
  // { game: "DOOM Eternal", genre: "FPS", id: 14 },
  // { game: "God Of War Ragnarok", genre: "Ação/Aventura", id: 18 },
  // { game: "Elden Ring", genre: "RPG", id: 26 },
  // { game: "F1 2023", genre: "Corrida", id: 25 },

  { game: "Spider Man 2", genre: "Ação/Aventura", id: 8 },
  { game: "DOOM Eternal", genre: "FPS", id: 6 },
  { game: "God Of War Ragnarok", genre: "Ação/Aventura", id: 18 },
  { game: "Elden Ring", genre: "RPG", id: 26 },
  { game: "F1 2023", genre: "Corrida", id: 25 },

];

const result = countAndSortInversions(games);
console.log('Número de inversões:', result.inversions);
console.log('Array ordenado:', result.sortedArray);
console.log('Elementos que não mudaram de preferência:', result.sameidElements);
