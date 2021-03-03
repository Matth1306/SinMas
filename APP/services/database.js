const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  connect: () => {
    mongoose.connect(
      process.env.DB_CONNECT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, db) => {
        if (err) throw err;
        console.log("Connected to DB!");
      }
    );
  },
};
