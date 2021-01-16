const express = require("express");
const router = express.Router();
const axios = require("axios");
const {signup,signin, requireSignIn} = require("../controller/auth");
const { validateSignUpRequest,validateSignInRequest, isRequestValidated} = require("../validators/auth");


//router.post("/signin",validateSignInRequest,isRequestValidated, signin);
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/profile",requireSignIn, (req,res) =>{
    res.render("profile",{
        user: req.user
    });
});

router.get("/signin", function(req, res){    
    res.render("signin",{
        user: req.user
    });
    console.log("going to signin");
});

router.get("/signup", function(req,res){
    res.render("signup",{
        user: req.user
    });
    console.log("going to signup");
});

module.exports = router;