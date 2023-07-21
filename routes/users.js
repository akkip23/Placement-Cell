const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");
const passport = require("passport");

//redirect to login and sign pages
router.get("/login", userController.signIn)
router.get("/SignUp", userController.signUp)

//get users login and sign up data and send to controller
router.post("/createAccount", userController.CreateAccount)
router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect: '/users/login'}
), userController.createSession)

router.get("/sign-out", userController.destroySession)


module.exports = router