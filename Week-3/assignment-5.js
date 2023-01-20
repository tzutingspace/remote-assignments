/* eslint-disable no-plusplus */
// 沒找到就回傳 -1
function binarySearchPositionMinusOne(numbers, target) {
  // find the middle index_number
  let indexNow = Math.floor(numbers.length / 2);
  // record left and right index
  const indexRecords = [0, numbers.length - 1];

  while (indexRecords[0] <= indexRecords[1]) {
    indexNow = Math.floor((indexRecords[1] + indexRecords[0]) / 2);
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
  }
  return -1;
}

// 如果重複的狀況，需回傳最小最左邊的index >> 換概念就是 就算找到 num[index] === target 也要往左邊繼續找看看
function binarySearchPosition(numbers, target) {
  // find the middle index_number
  let indexNow = Math.floor(numbers.length / 2);
  // record left and right index
  const indexRecords = [0, numbers.length - 1];

  while (indexRecords[0] <= indexRecords[1]) {
    indexNow = Math.floor((indexRecords[1] + indexRecords[0]) / 2);
    if (target > numbers[indexNow]) {
      indexRecords[0] = indexNow + 1;
    } else if (target <= numbers[indexNow]) {
      indexRecords[1] = indexNow - 1;
    }
  }
  return Math.abs(indexRecords[0]);
}

function twoSum(nums, target) {
  // your code here
  const boundary = [0, nums.length - 1];
  const outputArray = [];
  // 僅留下 target 左側的部份 (大於taget就不可能相加 => 如果有負值???)
  boundary[1] = binarySearchPosition(nums, target);
  // 利用 target / 2 => 找到其index => 分左邊和右邊array
  const halfIndex = binarySearchPosition(nums, Math.floor(target / 2));
  const leftArrayBoundary = [boundary[0], halfIndex - 1];
  const rightArrayBoundary = [halfIndex, boundary[1]];

  // 依據左邊Array 當基準去找 >> target - leftArray[index] = newTarget
  for (let i = leftArrayBoundary[0]; i <= leftArrayBoundary[1]; i++) {
    // console.log(`i: ${i}`);
    const newTarget = target - nums[i];
    // console.log(`我現在要找右邊是否有這個數字: ${newTarget}`);
    console.log(nums.slice(rightArrayBoundary[0], rightArrayBoundary[1]));
    // 精確尋找
    const findRightTarget = binarySearchPositionMinusOne(
      nums.slice(rightArrayBoundary[0], rightArrayBoundary[1]),
      newTarget
    );
    // console.log(`有找到嗎？: ${findRightTarget}`);
    if (findRightTarget !== -1) {
      outputArray[0] = i;
      outputArray[1] = rightArrayBoundary[0] + findRightTarget;
      console.log('Result:');
      return outputArray;
    }
  }
  console.log('Result:');
  return false;
}

/*
For example:
twoSum([2, 7, 11, 15], 9);
Should returns:
[0, 1]
Because:
nums[0]+nums[1] is 9
*/
console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10));
