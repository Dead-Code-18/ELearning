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

app.get("/index",function(req, res){ 
    res.render("index", 
    {
        currentuser: req.user,

    });
   console.log("going to index");
});


//signup page reqs
app.get("/signup", function(req,res){
    res.render("signup", 
    {
        currentuser: req.user,

    });
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
    res.render("login", 
    {
        currentuser: req.user,

    });
    console.log("going to signin");
});

app.get("/test", function(req, res){    
    res.render("test");
    console.log("testing");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login"
}) ,function(req,res){
    console.log("going to .........");
});

//logout req
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/index");

});

//demo secret page for testing
app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
});

app.get("/aboutus", function(req, res){    
    res.render("aboutus", 
    {
        currentuser: req.user,

    });
    console.log("going to aboutus");

});

app.get("/contactus", function(req, res){    
    res.render("contactus", 
    {
        currentuser: req.user,

    });
    console.log("going to contactus");

});

app.get("/profile", function(req, res){    
    res.render("profile", 
    {
        currentuser: req.user,

    });
    console.log("going to profile");

});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(8000, function(){
    console.log("server running...");
});
