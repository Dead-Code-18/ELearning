const express = require("express");
const router = express.Router();
const {createCategory, getCategory} = require("../controller/category");
const {requireSignIn} = require("../controller/auth");


router.post("/create",requireSignIn, createCategory);
router.get("/get", getCategory);

module.exports = router;

