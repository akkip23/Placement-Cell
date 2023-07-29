//require passport
const passport = require("passport");
//strategy to used for use authentication
const User = require("../model/users");
//require user schema from model
const LocalStrategy = require("passport-local").Strategy;

//using passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    //getting the user who is trying to login in and if valid creating session for him
    async function (email, password, done) {
      await User.findOne({ email: email })
        .then(function (user) {
          if (!user || user.password != password) {
            console.log("invalid userName/password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(function (err) {
          console.log("error in finding user", err);
          return done(err);
        });
    }
  )
);

//serilizing the user to decide which user to be kept in sesson cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserilizing the user from the session cookie
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      return done(null, user);
    })
    .catch(function (err) {
      console.log("error finding user", err);
    });
});

//middleware to check if the user is signed in can be used where ever it needed
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/login");
};

//req.user has has the current signed in user setting user to session cookie in locals to access it in views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
