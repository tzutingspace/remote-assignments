function max(numbers) {
  // your code here, for-loop method preferred
  let maxNow = 0;
  for (const number of numbers) {
    if (number > maxNow) {
      maxNow = number;
    }
  }
  return String(maxNow);
}
function findPosition(numbers, target) {
  // your code here, for-loop method preferred
  for (const index in numbers) {
    if (target === numbers[index]) {
      return index;
    }
  }
  return String(-1);
}

console.log(max([1, 2, 4, 5])); // should print 5
console.log(max([5, 2, 7, 1, 6])); // should print 7

console.log(findPosition([5, 2, 7, 1, 6], 5)); // should print 0
console.log(findPosition([5, 2, 7, 1, 6], 7)); // should print 2
console.log(findPosition([5, 2, 7, 7, 7, 1, 6], 7)); // should print 2 (the first position)
console.log(findPosition([5, 2, 7, 1, 6], 8)); // should print -1
