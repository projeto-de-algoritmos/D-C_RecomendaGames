function countAndSortInversions(arr) {
	if (arr.length <= 1) {
	  return { sortedArray: arr, inversions: 0 };
	}
  
	const mid = Math.floor(arr.length / 2);
	const left = arr.slice(0, mid);
	const right = arr.slice(mid);
  
	const leftResult = countAndSortInversions(left);
	const rightResult = countAndSortInversions(right);
	const mergeResult = mergeAndCountSplitInversions(leftResult.sortedArray, rightResult.sortedArray);
  
	return {
	  sortedArray: mergeResult.sortedArray,
	  inversions: leftResult.inversions + rightResult.inversions + mergeResult.inversions,
	};
  }
  
  function mergeAndCountSplitInversions(left, right) {
	let i = 0;
	let j = 0;
	let inversions = 0;
	const merged = [];
  
	while (i < left.length && j < right.length) {
	  if (left[i].catalog <= right[j].catalog) {
		merged.push(left[i]);
		i++;
	  } else {
		// Se o elemento da esquerda é maior, então há inversões com todos os elementos restantes na parte esquerda
		inversions += left.length - i;
		merged.push(right[j]);
		j++;
	  }
	}
  
	// Adiciona os elementos restantes (se houver) de ambos os subarrays
	return {
	  sortedArray: merged.concat(left.slice(i)).concat(right.slice(j)),
	  inversions,
	};
  }
  
  const games = [
	{ title: 'GameA', catalog: 3, image: 'gameA.jpg' },
	{ title: 'GameB', catalog: 10, image: 'gameB.jpg' },
	{ title: 'GameC', catalog: 2, image: 'gameC.jpg' },
	{ title: 'GameD', catalog: 4, image: 'gameD.jpg' },
	{ title: 'GameE', catalog: 1, image: 'gameE.jpg' },
	{ title: 'GameF', catalog: 5, image: 'gameF.jpg' },
	// Adicione mais jogos conforme necessário
  ];
  
  const result = countAndSortInversions(games);
  console.log('Número de inversões:', result.inversions);
  console.log('Array ordenado:', result.sortedArray);
  