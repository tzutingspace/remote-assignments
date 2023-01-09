function countAandB(input) {
    // your code here
    var count_a = 0;
    var count_b = 0;
    for (var char of input) {
        if (char == 'a') {
            count_a += 1;
        }
        else if (char == 'b') {
            count_b += 1;
        }
    }
    if ((count_a + count_b) != 0) {
        output = `${count_a + count_b} (${count_a} 'a' letter and ${count_b} 'b' letter)`;
    }
    else {
        output = `${count_a + count_b}`;
    }
    return output
}
function toNumber(input) {
    // your code here
    var output = [];
    for (let char of input) {
        output.push(char.charCodeAt(0) - 96);
    }
    return output
}

let input1 = ['a', 'b', 'c', 'a', 'c', 'a', 'c'];
console.log(countAandB(input1)); // should print 4 (3 ‘a’ letters and 1 ‘b’ letter)
console.log(toNumber(input1)); // should print [1, 2, 3, 1, 3, 1, 3]

let input2 = ['e', 'd', 'c', 'd', 'e'];
console.log(countAandB(input2)); // should print 0
console.log(toNumber(input2)); // should print [5, 4, 3, 4, 5]