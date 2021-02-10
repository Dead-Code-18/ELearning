const express = require("express");
const router = express.Router();
const { getUserRole, getProfile,updateProfile, changeRole } = require("../controller/profile.controller");
const { requireSignIn, validateInstructorRole } = require("../controller/auth.controller");

router.get("/role",requireSignIn, getUserRole);
router.get("/details", requireSignIn, getProfile);
router.post("/update", requireSignIn, updateProfile);
router.post("/changeRole", requireSignIn, changeRole);

module.exports = router;