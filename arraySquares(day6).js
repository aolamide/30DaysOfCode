//loop through each array member using .map and return the squares 
const arraySquares = arr => arr.map(number => number * number);

console.log(arraySquares([1,4,8])) //[1, 16, 64]
