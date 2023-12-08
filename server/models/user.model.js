
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
   
});

const User  = mongoose.model('User', UserSchema);
