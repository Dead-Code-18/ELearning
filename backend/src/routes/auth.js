const express = require("express");
const router = express.Router();
const {signup,signin, requireSignIn} = require("../controller/auth");
const { validateSignUpRequest,validateSignInRequest, isRequestValidated} = require("../validators/auth");


router.post("/signin",validateSignInRequest,isRequestValidated, signin);
router.post("/signup", validateSignUpRequest ,isRequestValidated, signup);
router.post("/profile",requireSignIn, (req,res) =>{
    res.status(200).json({
        user: "profile" 
    })
});

module.exports = router;