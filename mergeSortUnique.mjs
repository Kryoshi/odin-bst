export { mergeSortUnique };

function mergeSortUnique(array) {
  let l = array.length;
  if (l <= 1) {
    return array;
  }
  const offset = l % 2;
  const splitIndex = (l - offset) / 2;
  const right = mergeSortUnique(array.slice(splitIndex));
  const left = mergeSortUnique(array.slice(0, splitIndex));
  return mergeUnique(left, right);
}

function mergeUnique(left, right) {
  const l = left.length + right.length;
  let merged = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex + rightIndex < l) {
    if (
      left[leftIndex] < right[rightIndex] ||
      right[rightIndex] === undefined
    ) {
      merged.push(left[leftIndex]);
      leftIndex++;
    } else if (
      left[leftIndex] > right[rightIndex] ||
      left[leftIndex] === undefined
    ) {
      merged.push(right[rightIndex]);
      rightIndex++;
    } else {
      merged.push(left[leftIndex]);
      leftIndex++;
      rightIndex++;
    }
  }

  return merged;
}
