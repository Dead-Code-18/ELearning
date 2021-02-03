const express = require("express");
const router = express.Router();
const { getUserRole, getProfile,updateProfile } = require("../controller/profile.controller");
const { requireSignIn } = require("../controller/auth.controller");

router.get("/role", requireSignIn, getUserRole);
router.get("/details", requireSignIn, getProfile);
router.post("/update", requireSignIn, updateProfile);


module.exports = router;