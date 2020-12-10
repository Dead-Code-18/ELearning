const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");


var app = express();
app.set('view engine', 'ejs');
env.config();

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));


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

app.use("/auth", authRoutes);





