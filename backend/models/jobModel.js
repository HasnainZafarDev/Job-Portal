import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Provide Job Title"],
    minLength: [3, "Must Contain 3 Characters"],
    maxLength: [50, "Can Not exceed 50 Characters"],
  },
  description: {
    type: String,
    required: [true, "Please Provide Job Description"],
    minLength: [3, "Must Contain 3 Characters"],
    maxLength: [350, "Can Not exceed 350 Characters"],
  },
  category: {
    type: String,
    required: [true, "Please Provide Job Category"],
  },
  country: {
    type: String,
    required: [true, "Please Provide Job Country"],
  },
  city: {
    type: String,
    required: [true, "Please Provide City"],
  },
  location: {
    type: String,
    required: [true, "Please Provide Exact Location"],
    minLength: [20, "Exact Location must have 20 characters "],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed Salary Must Contain 4 digits"],
    maxLength: [9, "Fixed Salary Must Contain 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary from  Must Contain 4 digits"],
    maxLength: [9, "Salary from  Must Contain 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "SalaryTo  Must Contain 4 digits"],
    maxLength: [9, "SalaryTo  Must Contain 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now(),
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);

