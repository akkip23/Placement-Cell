//require .env package to access in the whole project
const dotenv = require("dotenv").config({ path: "./config.env" });
//initilizing express and calling all the functionalities of express
const express = require("express");
const app = express();
//port on which the app will run
const port = process.env.PORT;
//express-ejs-layout used to include partial code
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//flash messages
const flash = require("connect-flash");
//middleware file for flash messages
const customeMware = require("./config/middleware");
const session = require("express-session");
//include passport
const passport = require("passport");
//strategy for passport to authenticate user (local strategy is used)
const passportLocal = require("./config/passport_local_Strategy");
//databse connection file
const MongoStore = require("connect-mongo");

// app.use(express.static)
app.use(express.urlencoded({ extended: true }));

//folder from which static files will be accessed
app.use(express.static(`${process.env.ASSETS_PATH}`));
//set templating engine
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

//create session and store session data in database
app.use(
  session({
    name: "PlacementCell",
    secret: `${process.env.SESSION_SECREAT}`,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    store: MongoStore.create(
      {
        mongoUrl: process.env.DB,
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

//initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

//set Authenticated user
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customeMware.setFlash);
//routes
app.use("/", require("./routes/index"));

//to use/set html dynamically to ejs template
app.set("views", "./views");
app.set("view engine", "ejs");

//app will listen to the below provided port number
app.listen(port, (error) => {
  if (error) {
    console.log("error connecting to the server");
    return;
  }
  console.log("successfully connected and running on port", 8000);
});
