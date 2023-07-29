//get student model
const Student = require("../model/students");
//get schedule interview model
const ScheduleInterview = require("../model/scheduleInterview");
//require json2csv file to send user data to this file and downlaod data as csv file
const json2csv = require("../config/json2csv");

//redirect to add new student page
module.exports.NewStudent = function (req, res) {
  return res.render("student", {
    title: "Add Student",
  });
};

//get the form data of student and save to DB
module.exports.AddNewStudent = async function (req, res) {
  // console.log("req.body", req.body);

  try {
    const isStudent = await Student.exists({ mobile: req.body.mobile });
    // console.log("isStudent", isStudent);
    if (isStudent == null) {
      await Student.create(req.body).then((student) => {
        req.flash("success", "New Student Created Successfully");
        res.redirect("back");
      });
    } else {
      req.flash("error", "Stuent already exist with this Mobile number");
      res.redirect("back");
    }
  } catch (error) {
    console.log("error in creating student", error);
  }
};

//delete existing student from the database
module.exports.deleteStudent = async function (req, res) {
  try {
    await Student.deleteOne({ _id: req.params.id }).then(async () => {
      await ScheduleInterview.deleteOne({ student: req.params.id });
      req.flash("success", "Selected student deleted successfully");
      return res.redirect("back");
    });
  } catch (error) {
    console.log("error deleteing student", error);
  }
};

//schedule interview for student
module.exports.scheduleInterview = async function (req, res) {
  const studentData = await Student.find({});
  return res.render("ScheduleInterview", {
    title: "Schedule Interview",
    studentData: studentData,
  });
};

//get the scheduled interview form data and store it to the database
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
      req.flash("success", "interview has been scheduled successfully");
      res.redirect("back");
    });
  } catch (error) {
    console.log("error in scheduling interview", error);
  }
};

//redirect to view the scheduled interviews of student
module.exports.viewScheduledInterviews = async function (req, res) {
  const student = await Student.find({}).populate({ path: "interview" });
  return res.render("interviews", {
    title: "interviews",
    allocatedInterviews: student,
  });
};

//update student interviews status to Pending, placed, not selected, On Hold, etc
module.exports.updateStudentInterviewData = async function (req, res) {
  console.log(req.params.result, req.params.id);
  await Student.findByIdAndUpdate(req.params.id, {
    placement: req.params.result,
  })
    .then(function () {
      req.flash("success", "interview data updated successfully !!!");
      if (req.xhr) {
        return res.status(200).json({
          data: {
            resultUpdated: true,
          },
        });
      }
    })
    .catch(function (error) {
      console.log("error updating student data", error);
    });
};

//get all the student data and convert it to CSV format and send for download
module.exports.downloadReport = async function (req, res) {
  const student = await Student.find({}).populate({ path: "interview" });
  const csvFile = await json2csv.convertJson2CSV(student);
  console.log("csvFile", csvFile);
  res.attachment("student.csv");
  res.status(200).send(csvFile);
};
