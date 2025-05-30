const { timeStamp } = require("console")
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    phoneNumber: {type: Number, default: ""},
    role: { type: String, enum: ['student', 'instructor'], required: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId,ref: "Course"}],
    verified: {type: Boolean, default: false}
}, {timestamps: true})

const User = new mongoose.model("User", userSchema)

module.exports = User