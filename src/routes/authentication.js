const router = require("express").Router();
const pool = require("../database");
const passport = require("passport");

router.post("/login", async (req, res, next) => {
  const { Code, Password, Role } = req.body;
  if (Role === "Admin") {
    passport.authenticate("local.login_admins", {
      successRedirect: "/admin/students",
      failureRedirect: "/",
      failureFlash: true,
    })(req, res, next);
  } else if (Role === "Student") {
    passport.authenticate("local.login_students", {
      successRedirect: "/student",
      failureRedirect: "/",
      failureFlash: true,
    })(req, res, next);
  } else {
    passport.authenticate("local.login_profesors", {
      successRedirect: "/profesor",
      failureRedirect: "/",
      failureFlash: true,
    })(req, res, next);
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
