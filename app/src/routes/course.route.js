const express = require("express");
const {
  createCourse,
  getCourse,
  getAllCourse,
  updateCourse,
  getCourseForUser,
  getCourseForInstructor,
} = require("../controller/course.controller");
const {requireSignIn} = require("../controller/auth.controller");
const router = express.Router();

router.get("/getOwnedCourse", getCourseForUser);
router.get("/getUploadedCourse", getCourseForInstructor);
router.post("/create",requireSignIn, createCourse);
router.get("/:courseName", getCourse);
router.post("/:courseName", updateCourse);


module.exports = router;