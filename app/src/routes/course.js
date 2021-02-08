const express = require("express");
const {createCourse, getCourse, getAllCourse, updateCourse, searchCourse} = require("../controller/course.controller");
const {requireSignIn} = require("../controller/auth.controller");
const router = express.Router();

router.get("/", getAllCourse);
router.post("/", createCourse);
router.get("/:_id", getCourse);
router.post("/:_id", updateCourse);


module.exports = router;