const mongoose = require("mongoose")
const { timeStamp } = require("console");
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String, default: ""},
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  completed: {type: Boolean, default: "false"}
}, {timestamps: true})

const Course = new mongoose.model("Course", courseSchema)

module.exports = Course
