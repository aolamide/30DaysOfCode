const express = require('express');
const bp = require('body-parser');

//initialize app
const app = express();

//body-parser middleware
app.use(bp.json());

let dromes = [];

//isPalindrome function
const isPalindrome = str => str === str.toLowerCase().split('').reverse().join('');

//POST data
app.post('/postWords', (req, res) => {
  let words = req.body.words; //get the words from the req body
  //filter the words array to only return words that are palindromes using the palindrome checker
  dromes = words.filter(word => isPalindrome(word));
  return res.json({
    status : 'success',
    message : 'Words have been sent. Now go to /getDromes to get the palindromes'
  });
});

//GET request to get data
app.get('/getDromes', (req, res) => {
  return res.json({dromes});
});

const PORT = process.env.PORT || 5050;
//listen
app.listen(PORT, () => console.log('Server running on port ' + PORT));
