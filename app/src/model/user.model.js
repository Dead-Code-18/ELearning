const mongoose = require("mongoose");

 var userSchema = new mongoose.Schema({
    
    username: {
        type:String, 
        unique: true,
        required:true,
        trim: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
 }, {timestamps: true});


module.exports = mongoose.model("User", userSchema);