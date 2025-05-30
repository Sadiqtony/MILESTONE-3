
const User = require("../models/userSchema");
const Course = require("../models/courseSchema");
const Enrollment = require("../models/enrollment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




const handleSignUp = async (req, res)=>{

    try {
        
        const { email, password, firstName, lastName, phoneNumber, role } = req.body

        if(!email){
            return res.status(400).json({message: "Please add your email"})
        }
    
        if(!password){
            return res.status(400).json({message: "Please enter password"})
        }
    
        const existingUser = await User.findOne({ email })
    
        if(existingUser){
            return res.status(400).json({message: "User account already exist"})
        }
    
        if(password.length < 8){
            return res.status(400).json({message: "Password should be a min of 8 character"}) 
        }

        const hashedPassword = await bcrypt.hash(password, 10)
    
        const newUser = new User({ 
            email, 
            password: hashedPassword, 
            firstName, 
            lastName, 
            phoneNumber,
            role
        })
    
        await newUser.save()

        
        res.status(201).json({
            message: "User account created successfully",
            newUser: { email, firstName, lastName, phoneNumber, role }
        })


    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const handleLogin = async (req, res)=>{

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(!user){
        return res.status(404).json({message: "User account does not exist."})
    }

    const isMatch = await bcrypt.compare(password, user?.password)

    if(!isMatch){
        return res.status(400).json({message: "Incorrect email or password."})
    }


    const accessToken = jwt.sign(
        {id: user?._id },
        process.env.ACCESS_TOKEN,
        {expiresIn: "2h"}
    )

    const refreshToken = jwt.sign(
        {id: user?._id},
        process.env.REFRESH_TOKEN,
        {expiresIn: "15d"}
    )


    res.status(200).json({
        message: "Login successful",
        accessToken,
        user: {
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.phoneNumber,
            role: user?.role
        },
        refreshToken

    })

}

const handleCourse = async (req, res) => {

try {
  const {instructor, title, description} = req.body


  if(!instructor){
    return res.status(400).json({message:"please add instructor"})
  }

  if(!title){
    return res.status(400).json({messgae: "please add title"})
  }

if(!description){
  return res.status(400).json({message: "please add description"})
}

  const course = new Course({
    instructor,
    title,
    description
  })

  await course.save()
  res.status(201).json({messge: "course created succefully",
    course: {instructor, title, description}
  })

} catch (error) {
   res.status(500).json({message: error.message})

}

}

const handleEnrolled = async (req, res) => {
  const { studentId, courseId } = req.body

  try {
    const course = await Course.findById(courseId)
    if (!course) return res.status(404).json({ message: "Course not found" })

    const existing = await Enrollment.findOne({ student: studentId, course: courseId })
    if (existing) return res.status(400).json({ message: "Already enrolled" })

    const enrollment = new Enrollment({ student: studentId, course: courseId })
    await enrollment.save()

    res.status(201).json({ message: "Enrollment successful", enrollment })
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed" })
  }
}

const handleAllCourse =  async (req, res) => {
  const { instructor, tittle } = req.body

  try {
    const courses = await Course.find({ courses })

    if (!courses) {
      return res.status(404).json({ message: "No courses found for this instructor." });
    }

    res.status(200).json({ total: courses.length, courses })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" })
  }
}

const handleStudentCourse =  async (req, res) => {
  try {
    const courseId = req.params.course

    const enrollments = await enrollment.find({ course}).populate("name", "email");

    res.status(200).json({
      courseId,
      totalEnrolled: enrollments.length,
      students: enrollments.map(enr => enr.student),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enrolled students' });
  }
}

const handleViewEnrolledCourse = async (req, res) => {

  const {title, description, instructor, enrolledcourses} = req.body

  const enrolledCourses = await Course.find().populate()

  if(!Course){
    return res.status(404).json({message: "no course found"})
  }

  if(Course){
res.status(200).json({
    message: "successful",
    enrolledCourses
  })
  }

}




   module.exports = {
    handleLogin,
    handleStudentCourse,
    handleViewEnrolledCourse,
    handleAllCourse,
    handleEnrolled,
    handleSignUp,
    handleCourse
   }