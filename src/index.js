
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const hbs = require('express-handlebars').create({});
const { head } = require('./routes/index');
const flash = require('connect-flash');
const session = require('express-session');
const mySqlStore = require('express-mysql-session')(session);
const passport = require('passport');
// const methodOverride = require('method-override');

const { database } = require("./keys");

//Initiliazations
const app = express();
require("./lib/passport");
// require('./database');

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(
  session({
    secret: "myfinalproject",
    resave: false,
    saveUninitialized: false,
    store: new mySqlStore(database),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride('_method'));

//Global variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.error = req.flash("error");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

//Routes
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/admin/profesors", require("./routes/admin/profesors"));
app.use("/admin/students", require("./routes/admin/students"));
app.use("/admin/courses", require("./routes/admin/courses"));
app.use("/admin/subjects", require("./routes/admin/subjects"));
app.use("/admin/periods", require("./routes/admin/periods"));
app.use("/admin/departments", require("./routes/admin/departments"));
app.use("/admin/study_plans", require("./routes/admin/study_plans"));
app.use("/admin/classrooms", require("./routes/admin/classrooms"));
app.use("/admin/programs", require("./routes/admin/programs"));
app.use("/admin/enrollments", require("./routes/admin/enrollments"));
app.use("/admin/instructs", require("./routes/admin/instructs"));
app.use("/admin/composes", require("./routes/admin/composes"));
app.use("/admin/schedules", require("./routes/admin/schedules"));
app.use("/admin/registers", require("./routes/admin/registers"));
app.use("/admin/hires", require("./routes/admin/hires"));
app.use("/admin/lodges", require("./routes/admin/lodges"));
app.use("/admin/meetings", require("./routes/admin/meetings"));
app.use("/admin/attends", require("./routes/admin/attends"));
app.use("/student", require("./routes/student/home"));
app.use("/student/attends", require("./routes/student/attends"));
app.use("/profesor", require("./routes/profesor/home"));
app.use("/profesor/meetings", require("./routes/profesor/meetings"));
app.use("/profesor/subjects", require("./routes/profesor/subjects"));
app.use("/profesor/schedules", require("./routes/profesor/schedules"));
app.use("/student/subjects", require("./routes/student/subjects"));
app.use("/student/schedules", require("./routes/student/schedules"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Server is listenning
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
