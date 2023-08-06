const User = require("../model/users");
const Student = require("../model/students");

//controller action to redirect to the login page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("SignIn", {
    title: "Login",
  });
};

//controller action to redirect to the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("SignUp", {
    title: "Sign up",
  });
};

//get the sign up data and save to dataBase
module.exports.CreateAccount = async function (req, res) {
  try {
    //check if the question exist in the database
    try {
      const userEmail = req.body.email;
      const users = await Student.find({ email: userEmail });
      console.log(users);
      if (users.length != 0) {
        console.log("i am cumming");
        req.flash("error", "Student Cannot register to Placement Cell");
        return res.redirect("back");
      }
    } catch (error) {
      console.error("Error querying the database:", error);
    }

    const isUser = await User.exists({ email: req.body.email });
    // console.log("req.body", isUser);
    if (isUser != null) {
      req.flash("error", "Account Already Exist With this Email");
      return res.redirect("back");
    }

    if (req.body.password == req.body.Cnfpassword) {
      await User.create(req.body).then((user) => {
        req.flash("success", "Account Created Successfully");
        // console.log("created new user", user);
        res.redirect("/users/login");
      });
    } else {
      req.flash("error", "password and confirm password cannot be different");
      res.redirect("back");
    }
  } catch (error) {
    // res.status(200).
    console.log("error creating new user", error);
  }
};

module.exports.createSession = function (req, res) {
  res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    return res.redirect("/");
  });
};
