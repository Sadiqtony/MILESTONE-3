
const express = require ("express")
const router = express.Router()
const {handleSignUp} = require("../authControllers")
const {handleLogin} = require("../authControllers")
const {handleCourse} = require("../authControllers")
const {handleEnrolled} = require("../authControllers")
const {handleAllCourse} = require("../authControllers")
const {handleStudentCourse} = require("../authControllers")
const {handleViewEnrolledCourse} = require("../authControllers")


router.post("/sign-up", handleSignUp)
router.post("/login", handleLogin)
router.post("/create-course", handleCourse)
router.post("/enroll", handleEnrolled)
router.get("/fetch-allcourses", handleAllCourse)
router.get("/course-students", handleStudentCourse)
router.get("/allEnrolledCourses", handleViewEnrolledCourse)

module.exports = router
 

