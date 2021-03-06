const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
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
    });
};

const loginUser = async (req, res) => {
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
}

const getUser = async (req, res) => {
    //get email from request body
    const { email } = req.body;

    //find user with that email
    const user = await User.findOne({email});

    //return user details
    let { username, dateCreated, _id } = user;

    return res.json({
        _id, email, username, dateCreated
    });
}

const getAllUsers = async (req, res) => {
    const users = await User.find().select('username email dateCreated');
    return res.json({users});
};

const deleteUser = async (req, res) => {
    //Get email of user to delete from req.body 
    const { email } = req.body;
    const user = await User.findOneAndDelete({email});
    if(!user) return res.json({ error : "User not found"});
    return res.json({message : "User deleted successfully"});
}

const updateUser = async (req, res) => {
    //Get email of user to update
    const { email } = req.body;
    const updatedUser = await User.findOneAndUpdate({email}, req.body);
    if(!updatedUser) return res.json({ error : "User not found"});
    //remember not to return user hash
    updatedUser.hash = undefined;

    return res.json({user : updatedUser});
}

module.exports = {
    createUser, loginUser, updateUser, deleteUser, getAllUsers, getUser
};
