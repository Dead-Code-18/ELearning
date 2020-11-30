var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    localStrategy =  require("passport-local"), 
    passportlocalMongoose = require("passport-local-mongoose"),
    user = require("./model/user"),
    passport = require("passport");
    path = require("path");

mongoose.connect("mongodb://localhost/e-learning", { useNewUrlParser: true } , { useUnifiedTopology: true });


var app = express();
app.set('view engine','ejs');

//adding static assets for html files
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/css"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Who are you? A copy of me?",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//configuring passport
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//============== routing code =======================

app.get("/",function(req, res){ 
   res.render("index");
   console.log("going to index");
});


//signup page reqs
app.get("/signup", function(req,res){
    res.render("signup");
    console.log("going to signup");

});
app.post("/signup", function(req, res){
    user.register(new user({name: req.body.username,
                           username: req.body.email}),
                           req.body.password,
    function(err, user){
        if(err){
            console.log(err);
            res.render("signup");
        }else{
            res.render("login");
        }
    });
});

//login page reqs
app.get("/login", function(req, res){    
    res.render("login");
    console.log("going to signin");

});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}) ,function(req,res){
    console.log("going to .........");
});


app.get("/logout", function(req, res){

    req.logout();
    res.redirect("/");

});

app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("server running...");
});