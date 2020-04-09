const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

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

    if(usernameExists) return res.status(403).json({error : 'Usernme is taken, choose another'});

    //hash password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds)
    .then(hash => {
        const newUser = { username, email, hash};
        //add newUser to users array
        users.push(newUser);
        
        return res.json({mesage : 'registered successfully'})
    })
});

//Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    //check if any user has that email
    const user = users.find(user => user.email === email);

    //if no user has that email, return error message
    if(!user) return res.status(402).json({error : "Email is not registered on platform"});

    //if user, check password
    bcrypt.compare(password, user.hash)
    .then(result => {
        //if password is wrong, return unauthorised
        if(result === false) return res.status(403).json({error : "Incorrect login credentials"});

        //if password is correct, return user details (remove hash)
        const { username, email } = user;
        return res.json({username, email});
    })
});


app.listen(3002, () => console.log('server on'));