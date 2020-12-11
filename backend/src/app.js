const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const courseRoutes = require("./routes/course");


var app = express();
app.set('view engine', 'ejs');
env.config();

app.use(express.json());
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

app.use("/auth", authRoutes);
app.use("/category",categoryRoutes);
app.use("/course",courseRoutes);



