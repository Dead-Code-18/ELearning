const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const courseRoutes = require("./routes/course");
const path = require("path");
const bodyparser = require("body-parser");


var app = express();
app.set('view engine', 'ejs');
env.config();

app.use(express.static(path.dirname(__dirname) + "/node_modules"));
app.use(express.static(path.dirname(__dirname) + "/css"));
app.use(express.static(path.dirname(__dirname) + "/images"));
app.use(express.static(path.dirname(__dirname) + "/scripts"));


app.use(bodyparser.json());
app.use(bodyparser.raw());
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.raw());

mongoose.connect("mongodb://localhost/e-learning", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Database Connected");
});


//============== routing code =======================

app.listen(3000, function () {
    console.log("server running...");
});

app.use("/index",(req,res) => {
    res.render("index",{
        user: req.user
    });
});
app.use("/auth", authRoutes);
app.use("/category",categoryRoutes);
app.use("/course",courseRoutes);



