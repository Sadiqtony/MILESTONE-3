
const express = require ("express")
const router = express.Router()


const {
  handleSignUp,
  handleLogin,
  handleCourse,
  handleEnrolled,
  handleAllCourse,
  handleStudentCourse,
  handleViewEnrolledCourse,
} = require("../controllers/controller");

router.post("/sign-up", handleSignUp)
router.post("/login", handleLogin)
router.post("/create-course", handleCourse)
router.post("/enroll", handleEnrolled)
router.get("/fetch-allcourses", handleAllCourse)
router.get("/fetch-allcourses", handleAllCourse)
router.get("/course-students", handleStudentCourse)
router.get("/allEnrolledCourses", handleViewEnrolledCourse)

module.exports = router


