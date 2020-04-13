const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();


app.use(bodyParser.json());

//users array
const users = [];

//register route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    //check if a user already has the emil address
    const emailExists = users.find(user => user.email === email);

    //check if username is taken
    const usernameExists = users.find(user => user.username === username);

    if(emailExists) return res.status(403).json({error : 'Email is already registered'})

    if(usernameExists) return res.status(403).json({error : 'Username is taken, choose another'});

    //hash password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds)
    .then(hash => {
        const newUser = { username, email, hash, dateCreated : Date.now()};
        //add newUser to users array
        users.push(newUser);
        
        return res.json({mesage : 'registered successfully'})
    })
});

//Login route
app.post('/login', (req, res) => {
    const { username, email, password } = req.body;

    let user;
    //if username is sent as request, use username to find user, else use email
    if(username) {
        //check if any user has that username
        user = users.find(user => user.username === username);
    } else if(email) {
        //check if any user has that email
        user = users.find(user => user.email === email);
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

app.post('/getuser', (req, res) => {
    //get email from request body
    const { email } = req.body;

    //get token from request header
    const token = req.headers.authorization.split(' ')[1];
    //if no token is sent, return error message
    if(!token) return res.json(403).json({"error" : "Not allowed"});

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //check if email is equal to the decoded token
    if(email !== decoded) return res.status(403).json({"error" : "Not allowed"});

    //find user with that email
    const user = users.find(user => user.email === decoded);

    //return user details
    let { username, dateCreated } = user;
    dateCreated = new Date(dateCreated);

    return res.json({
        email, username, dateCreated
    });
});

app.listen(3002, () => console.log('server on'));