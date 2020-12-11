const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

 var userSchema = new mongoose.Schema({
    firstName: {
         type: String,
         required:true,
         trim: true,
         min:3,
         max:20
    },
    lastName: {
         type:String, 
         required:true,
         trim: true,
         min:3,
         max:20
    },
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
    hashPassword: {
        type: String,
        required: true
    }
 }, {timestamps: true});


userSchema.virtual("password").set(function(password){
    this.hashPassword = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullName").get(function(){
    return this.firstName+" "+this.lastName;
});

userSchema.methods = {
    authenticate : function(password){
        return bcrypt.compareSync(password, this.hashPassword)
    }
}

module.exports = mongoose.model("User", userSchema);