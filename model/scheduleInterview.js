const mongoose = require("mongoose");

//create new schema for interview of students
const interviewSchema = mongoose.Schema(
  {
    student: {
      type: "string",
      required: true,
    },
    Company: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    time: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ScheduleInterview = mongoose.model("ScheduleInterview", interviewSchema);

module.exports = ScheduleInterview;
