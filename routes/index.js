const express = require("express");
const router = express.Router()
const homeController = require("../controllers/home_controller")
const passport = require("passport");

router.get("/", passport.checkAuthentication, homeController.home)

//redirect to the req routes
router.use("/users", require("./users"))
router.use("/collection", require("./collection"))

module.exports = router  