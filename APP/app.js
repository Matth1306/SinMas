const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const database = require("./services/database");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loggerRouter = require("./routes/logger");
const dashRouter = require("./routes/dashboard");
const recordRouter = require("./routes/records");
const errRouter = require("./routes/error");
const ncrRouter = require("./routes/ncr");
const uploadRouter = require("./routes/file");
const emailRouter = require("./routes/email");

const app = express();

database.connect();
const cron = require("./library/cron");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/logger", loggerRouter);
app.use("/api/dashboard/map", dashRouter.map);
app.use("/api/dashboard/overview", dashRouter.overview);
app.use("/api/dashboard/stats", dashRouter.stats);
app.use("/api/records", recordRouter);
app.use("/api/error", errRouter);
app.use("/api/ncr", ncrRouter);
app.use("/api/file", uploadRouter);
app.use("/api/email", emailRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
