//require .env package to access in the whole project
const dotenv = require("dotenv").config({path: "./config.env"}) 
//initilizing express and calling all the functionalities of express
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose")
const flash = require("connect-flash");
const customeMware = require("./config/middleware");
const session = require("express-session");
const passport = require("passport")
const passportLocal = require("./config/passport_local_Strategy");
const MongoStore = require("connect-mongo");

// app.use(express.static)
app.use(express.urlencoded({extended: true}))

//static file
app.use(express.static(`${process.env.ASSETS_PATH}`))
//set templating engine
app.use(expressLayouts)
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

app.use(session({
    name: 'PlacementCell', 
    secret: `${process.env.SESSION_SECREAT}`,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: false,
    store: MongoStore.create(
      {
        mongoUrl: process.env.DB ,
      },
      function (err) { 
        console.log(err || "connect-mongodb setup ok");
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser);
// app.use(flash());
// app.use(customeMware.setFlash);
//routes
app.use("/", require("./routes/index")) 

//to use/set html dynamically to ejs template
app.set("views", "./views")
app.set("view engine", "ejs")

//app will listen to the below provided port number
app.listen(8000, (error) => {
    if (error) {
        console.log("error connecting to the server");
        return
    }
    console.log("successfully connected and running on port", 8000); 
})