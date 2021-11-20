const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then(function () {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err.message);
  });
