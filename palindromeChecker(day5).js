//step 1 : convert string to lowercase
// step 2 : turn string array
// step 3 : reverse the array
// step 4 : join it as a string back
// step 5 : compare this with the original string (returns true or false)

const palindromeChecker = str => str.toLowerCase() === str.toLowerCase().split().reverse().join('')

console.log(palindromeChecker('nUrSeS rUN')) //true
console.log(palindromeChecker('no palindrome')) //false
