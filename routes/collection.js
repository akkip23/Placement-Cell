const express = require("express");
const router = express.Router();
const CollectionController = require("../controllers/collection_controller");
const passport = require("passport");

router.get(
  "/newStudent",
  passport.checkAuthentication,
  CollectionController.NewStudent
);

//save new student data
router.post("/AddNewStudent", CollectionController.AddNewStudent);

//save new student data
router.get("/deleteStudentData/:id", CollectionController.deleteStudent);

//schedule a interview for a student
router.get("/scheduleInterview", CollectionController.scheduleInterview);

//save scheduled interview data
router.post(
  "/savescheduleInterviewData",
  CollectionController.savescheduleInterviewData
);

//Show scheduled interview data
router.get(
  "/ScheduledInterviews",
  CollectionController.viewScheduledInterviews
);

//update interview result data
router.post(
  "/updateInterviews/:id/:result",
  CollectionController.updateStudentInterviewData
);

//download student report in csv format
router.get("/get-report", CollectionController.downloadReport);

module.exports = router;
