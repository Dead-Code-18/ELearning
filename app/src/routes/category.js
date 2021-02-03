const express = require("express");
const router = express.Router();
const {createCategory, getCategory} = require("../controller/category.controller");
const {requireSignIn} = require("../controller/auth.controller");


router.post("/create",requireSignIn, createCategory);
router.get("/get", getCategory);

module.exports = router;

