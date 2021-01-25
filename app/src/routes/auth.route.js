const express = require("express");
const router = express.Router();
const {signup,signin, requireSignIn} = require("../controller/auth.controller");



//router.post("/signin",validateSignInRequest,isRequestValidated, signin);
router.post("/login", signin);
router.post("/signup", signup);
router.get("/profile",requireSignIn, (req,res) =>{
    res.status(200).json({ message: "profile page" });
});

router.get("/login", function(req, res){    
    res.status(200).json({ message: "signin page" });
    console.log("going to signin");
});

router.get("/signup", function(req,res){
    res.status(400).json({ message: "signup page" });
    console.log("going to signup");
});

module.exports = router;