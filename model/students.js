const mongoose = require("mongoose");

//create new schema for student
const studentSchema = mongoose.Schema(
  {
    batch: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    mobile: {
      type: "string",
      required: true,
    },
    college: {
      type: "string",
      required: true,
    },
    placement: {
      type: "string",
      required: true,
    },
    dsa_marks: {
      type: "string",
      required: true,
    },
    web_dev: {
      type: "string",
      required: true,
    },
    react: {
      type: "string",
      required: true,
    },
    interview: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ScheduleInterview",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
