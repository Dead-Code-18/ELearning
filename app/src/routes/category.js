const express = require("express");
const {createCategory, insertCoursesIntoCategory, getCourses} = require("../controller/category.controller");
const {requireSignIn} = require("../controller/auth.controller");
const router = express.Router();

router.post("/", createCategory);
router.get("/:categoryName", getCourses);

module.exports = router;