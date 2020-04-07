const express = require('express');
const bp = require('body-parser');

//initialize app
const app = express();

//body-parser middleware
app.use(bp.json());

let data = {};

//POST data
app.post('/create', (req, res) => {
  data = {...data, req.body};
  return res.json('saved successfully');
})

//GET request to get data
app.get('/get', (req, res) => {
  return res.json(data);
})

const PORT = process.env.PORT || 5050;
//listen
app.listen(PORT, () => console.log('Server running on port ' + PORT));
