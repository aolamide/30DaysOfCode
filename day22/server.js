const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//MORGAN LOGGER
const morgan = require('morgan');
const fs = require('fs');

//connect to db
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/day17';

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex : true})
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

const app = express();

//LOGGER
app.use(morgan('common', {
    stream : fs.createWriteStream('./logs.txt', {flags : 'a'})
}));

app.use(morgan('dev'));


app.use(bodyParser.json());

const {createUser, loginUser, getUser, getAllUsers, updateUser, deleteUser} = require('./user.controller');

//create an authMiddleware for all private routes
const authMiddleware = async(req, res, next) => {
    //get email from request body
    const { id } = req.params;

    //get token from request header
    const token = req.headers.authorization.split(' ')[1];

    //if no token is sent, return error message
    if(!token) return res.json(403).json({"error" : "Not allowed"});

    //verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //check if user id is equal to the decoded id, if it is not, return error
    if(id != decoded) return res.status(403).json({"error" : "Not allowed"});

    //if email and token confirmed, go to next middleware
    return next();
};

//register route
app.post('/signup', createUser );

//Login route
app.post('/login', loginUser );

//get user route
app.get('/getuser/:id', authMiddleware,  getUser);

//get all users route
app.get('/getAllUsers', getAllUsers);

//updateUser route
app.put('/updateUser/:id', authMiddleware, updateUser);

//delete user route
app.delete('/deleteUser/:id', authMiddleware, deleteUser);

//LOGS
app.get('/logs', (req, res) => {
    fs.readFile('./logs.txt', 'utf8', (err, data) => {
        if(err) return res.json('No logs');
        return res.send(data);
    })
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log('server on'));