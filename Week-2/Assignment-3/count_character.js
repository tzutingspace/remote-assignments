function count(input) {
  // your code here
  const outputObject = {};
  // for (const item of input) {
  input.forEach((item) => {
    if (!(item in outputObject)) {
      outputObject[item] = 1;
    } else if (item in outputObject) {
      outputObject[item] += 1;
    }
  });
  return outputObject;
}

const input1 = ['a', 'b', 'c', 'a', 'c', 'a', 'x'];
console.log(count(input1));
// should print {a:3, b:1, c:2, x:1}

function groupByKey(input) {
  // your code here
  const outputObject = {};
  // for (const itemObj of input) {
  input.forEach((itemObj) => {
    if (!(itemObj.key in outputObject)) {
      outputObject[itemObj.key] = itemObj.value;
    } else if (itemObj.key in outputObject) {
      outputObject[itemObj.key] += itemObj.value;
    }
  });
  return outputObject;
}

const input2 = [
  { key: 'a', value: 3 },
  { key: 'b', value: 1 },
  { key: 'c', value: 2 },
  { key: 'a', value: 3 },
  { key: 'c', value: 5 },
];
console.log(groupByKey(input2));
// should print {a:6, b:1, c:7}
