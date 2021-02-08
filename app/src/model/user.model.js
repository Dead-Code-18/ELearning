const mongoose = require("mongoose");

 var userSchema = new mongoose.Schema(
   {
     username: {
       type: String,
       unique: true,
       required: true,
       trim: true,
       index: true,
       lowercase: true,
     },
     ownedCourses: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Course",
       default: null,
       required: true,
     }],
     email: {
       type: String,
       required: true,
       trim: true,
       unique: true,
     },
     password: {
       type: String,
       required: true,
     },
     role: {
       type: String,
       required: true,
       default: "student",
     },
     country: {
       type: String,
       default: null,
     },
     state: {
       type: String,
       default: null,
     },
     education: {
       type: String,
       default: null,
     },
   },
   { timestamps: true }
 );


module.exports = mongoose.model("User", userSchema);