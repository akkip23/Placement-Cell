const Student = require("../model/students");

//redirect to home page/ Dashboard
module.exports.home = async function (req, res) {
  try {
    const studentData = await Student.find({});

    // console.log("studentData", studentData);
    res.render("home", {
      title: "Placement Cell",
      studentData: studentData, 
    });
  } catch (error) {}
};
