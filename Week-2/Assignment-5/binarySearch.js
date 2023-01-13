function binarySearchPosition(numbers, target) {
  // your code here
  // find the middle index_number
  let indexNow = Math.floor(numbers.length / 2);
  // record left and right index
  const indexRecords = [0, numbers.length - 1];

  // for (let i = 0; i < numbers.length; i += 1) {
  while (indexRecords[0] <= indexRecords[1]) {
    indexNow = Math.floor((indexRecords[1] + indexRecords[0]) / 2);
    // console.log(indexRecords[0], indexNow, indexRecords[1]);
    // 1: if find the target >> return index
    if (target === numbers[indexNow]) {
      return indexNow;
    }
    // 2: if numbers[indexNow] larger than target > right > resign left record index
    if (target > numbers[indexNow]) {
      indexRecords[0] = indexNow + 1;
    }
    // 3: if index_number smaller than target  > left > resign right record index
    else if (target < numbers[indexNow]) {
      indexRecords[1] = indexNow - 1;
    }
    // console.log(indexRecords[0], indexNow, indexRecords[1]);
  }
  return -1;
}

console.log(binarySearchPosition([1, 2, 5, 6, 7], 1)); // should print 0
console.log(binarySearchPosition([1, 2, 5, 6, 7], 6)); // should print 3

// 測試無法找到數字的狀況
// console.log(binarySearchPosition([1, 2, 3, 5, 6, 7, 10, 11], 12)); // 找到最右邊
// console.log(binarySearchPosition([2, 3, 5, 6, 7, 8], 1)); // 找到最左邊
// console.log(binarySearchPosition([2, 4, 6, 8, 10, 12], 9)); // 中間
