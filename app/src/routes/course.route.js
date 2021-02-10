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
  getCourseIDForUser,
  
} = require("../controller/course.controller");
const {
  requireSignIn,
  validateUser,
  validateInstructorRole,
  validateOwner,
} = require("../controller/auth.controller");
const router = express.Router();

router.get("/getOwnedCourse",requireSignIn, getCourseForUser);
router.get("/id/get",requireSignIn, getCourseIDForUser);
router.get("/getUploadedCourse",requireSignIn,validateInstructorRole, getCourseForInstructor);
router.post("/create",requireSignIn,validateInstructorRole, createCourse);
router.get("/get", getAllCourse);
router.post("/update",requireSignIn,validateInstructorRole,validateOwner, updateCourse);
router.get("/search", searchCourse);
router.get("/owner/get", getCourseOwner);
router.get("/buy",requireSignIn, buyCourse);

module.exports = router;