const Student = require("../model/students");
const ScheduleInterview = require("../model/scheduleInterview");
const json2csv = require("../config/json2csv");

module.exports.NewStudent = function (req, res) {
  return res.render("student", {
    title: "Add Student",
  });
};

module.exports.AddNewStudent = async function (req, res) {
  // console.log("req.body", req.body);

  try {
    const isStudent = await Student.exists({ mobile: req.body.mobile });
    // console.log("isStudent", isStudent);
    if (isStudent == null) {
      await Student.create(req.body).then((student) => {
        // req.flash("success", "New Student Created Successfully");
        res.redirect("back");
      });
    } else {
      // req.flash("error", "Stuent already exist with this Mobile number")
      res.redirect("back");
    }
  } catch (error) {
    console.log("error in creating student", error);
  }
};

module.exports.deleteStudent = async function (req, res) {
  try {
    await Student.deleteOne({ _id: req.params.id }).then(async () => {
      await ScheduleInterview.deleteOne({ student: req.params.id });
      // req.flash("success", "Selected student deleted successfully")
      return res.redirect("back");
    });
  } catch (error) {
    console.log("error deleteing student", error);
  }
};

module.exports.scheduleInterview = async function (req, res) {
  const studentData = await Student.find({});
  return res.render("ScheduleInterview", {
    title: "Schedule Interview",
    studentData: studentData,
  });
};

module.exports.savescheduleInterviewData = async function (req, res) {
  // console.log("req.body", req.body);

  try {
    const student = await Student.findById(req.body.studentName);
    await ScheduleInterview.create({
      student: req.body.studentName,
      Company: req.body.Company,
      date: req.body.date,
      time: req.body.time,
    }).then((interview) => {
      student.interview.push(interview);
      student.save();
      // req.flash("success", "inter schedule for")
      res.redirect("back");
    });
  } catch (error) {
    console.log("error in scheduling interview", error);
  }
};

module.exports.viewScheduledInterviews = async function (req, res) {
  const student = await Student.find({}).populate({ path: "interview" });
  console.log("allocatedInterviews", student[1].interview);
  return res.render("interviews", {
    title: "interviews",
    allocatedInterviews: student,
  });
};

module.exports.updateStudentInterviewData = async function (req, res) {
  console.log(req.params.result, req.params.id);
  await Student.findByIdAndUpdate(req.params.id, {
    placement: req.params.result,
  })
    .then(function () {
      // req.flash("success", "interview data updated successfully !!!")
      return res.redirect("/collection/ScheduledInterviews");
    })
    .catch(function (error) {
      console.log("error updating student data", error);
    });
};

module.exports.downloadReport = async function (req, res) {
  const student = await Student.find({}).populate({ path: "interview" });
  const csvFile = await json2csv.convertJson2CSV(student);
  console.log("csvFile", csvFile);
  res.attachment("student.csv");
  res.status(200).send(csvFile);
};
