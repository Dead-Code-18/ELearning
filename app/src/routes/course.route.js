const express = require("express");
const {
  createCourse,
  getCourse,
  getAllCourse,
  updateCourse,
  getCourseForUser,
  getCourseForInstructor,
  searchCourse,
  getCourseOwner,
  buyCourse,
} = require("../controller/course.controller");
const {requireSignIn} = require("../controller/auth.controller");
const router = express.Router();

router.get("/getOwnedCourse", getCourseForUser);
router.get("/getUploadedCourse", getCourseForInstructor);
router.post("/create", createCourse);
router.get("/get", getCourse);
router.post("/update", updateCourse);
router.get("/search", searchCourse);
router.get("/owner/get", getCourseOwner);
router.get("/buy", buyCourse);

module.exports = router;