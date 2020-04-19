const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    names : {
        type : Array,
        required : true
    },
    occupation : {
        type : String,
        required : true
    },
    lastLogin : {
        type : Date
    },
    email : {
        type : String,
        required : true
    },
    hash : {
        type : String,
        required : true
    },
    dateCreated : {
        type : Date,
        default : Date.now()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;