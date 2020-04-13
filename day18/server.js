const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//connect to db
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/day17';

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex : true})
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

const User = require('./user.model');

const app = express();


app.use(bodyParser.json());


//register route¦
app.post('/signup',async (req, res) => {
    const { username, email, password } = req.body;
    //check if a user already has the emil address
    const emailExists = await User.findOne({email});

    //check if username is taken
    const usernameExists = await User.findOne({username});

    if(emailExists) return res.status(403).json({error : 'Email is already registered'})

    if(usernameExists) return res.status(403).json({error : 'Username is taken, choose another'});

    //hash password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds)
    .then(hash => {
        const newUser = new User({ username, email, hash});
        //add newUser to users array
        newUser.save((err, saved) => {
            //if error while saving, return error message
            if(err || !saved) return res.status(500).json({error: "Error occured"})
            return res.json({message : 'registered successfully'})
        });
    })
});

//Login route
app.post('/login', async(req, res) => {
    const { username, email, password } = req.body;

    let user;
    //if username is sent as request, use username to find user, else use email
    if(username) {
        //check if any user has that username
        user = await User.findOne({username});
    } else if(email) {
        //check if any user has that email
        user = await User.findOne({email});
    }
    
    //if no user has that email or username, return error message
    if(!user) return res.status(402).json({error : "Email or username is not registered on platform"});

    //if user, check password
    bcrypt.compare(password, user.hash)
    .then(result => {
        //if password is wrong, return unauthorised
        if(result === false) return res.status(403).json({error : "Incorrect login credentials"});

        const { email } = user;

        //sign token with user's email
        const token = jwt.sign(email, process.env.JWT_SECRET);

        //Send token
        return res.json({token});
    })
});

app.post('/getuser', async (req, res) => {
    //get email from request body
    const { email } = req.body;

    //get token from request header
    const token = req.headers.authorization.split(' ')[1];
    //if no token is sent, return error message
    if(!token) return res.json(403).json({"error" : "Not allowed"});

    //verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //check if email is equal to the decoded token
    if(email !== decoded) return res.status(403).json({"error" : "Not allowed"});

    //find user with that email
    const user = await User.findOne({email : decoded});

    //return user details
    let { username, dateCreated, _id } = user;

    return res.json({
        _id, email, username, dateCreated
    });
});

app.listen(3002, () => console.log('server on'));