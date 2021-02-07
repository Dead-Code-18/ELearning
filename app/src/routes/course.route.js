const express = require("express");
const {createCourse, getCourse, getAllCourse, updateCourse} = require("../controller/course.controller");
const {requireSignIn} = require("../controller/auth.controller");
const router = express.Router();

router.get("/",requireSignIn, getAllCourse);
router.post("/create",requireSignIn, createCourse);
router.get("/:courseName", getCourse);
router.post("/:courseName", updateCourse);


module.exports = router;