//require mongoose to connect to DB
const mongoose = require("mongoose");

const db = process.env.DB;

mongoose
  .connect(db)
  .then(function () {
    console.log(`connection successfull to database`);
  })
  .catch((err) => {
    console.log("error connecting server", err);
  });
