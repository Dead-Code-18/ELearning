const express = require("express");
const {createCourse, getCourse, getAllCourse, updateCourse} = require("../controller/course.controller");
const {requireSignIn} = require("../controller/auth.controller");
const router = express.Router();

router.get("/", getAllCourse);
router.post("/", createCourse);
router.get("/:courseName", getCourse);
router.post("/:courseName", updateCourse);
module.exports = router;