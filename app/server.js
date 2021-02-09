const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const env = require("dotenv");
const path = require("path");
const authRoutes = require("./src/routes/auth.route");
const courseRoutes = require("./src/routes/course");
const profieRoutes = require("./src/routes/profile.route");
const contentRoutes = require('./src/routes/content.js');
const categoryRoutes = require("./src/routes/category.js");
const bodyparser = require("body-parser");


console.log(path.dirname(__dirname));


const app = express();
app.use(express.static(path.dirname(__dirname) + "/node_modules"));


app.use(bodyparser.json());
app.use(bodyparser.raw());
app.use(bodyparser.urlencoded({extended: false}));

app.use(express.raw());
var cors = require("cors");

app.use(cors());

mongoose.connect("mongodb://localhost/e-learning", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Database Connected");
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./src/config/passport")(passport);


//============== routing code =======================

app.listen(4000, function () {
    console.log("server running at port 4000");
});

app.use("/index",(req,res) => {
    res.status(200).json({ message: "this is index page" });
});

app.use("/category", categoryRoutes);
app.use("/auth", authRoutes);
app.use("/course", contentRoutes, courseRoutes);
app.use("/profile",profieRoutes);