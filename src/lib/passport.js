const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");

passport.use(
  "local.login_students",
  new LocalStrategy(
    {
      usernameField: "Code",
      passwordField: "Password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      //verifr password with database
      const rows = await pool.query(
        "SELECT * FROM Students WHERE cod_stud = ?",
        [username]
      );
      if (rows.length > 0) {
        const user = rows[0];
        var tempPassword = await pool.query(
          "SELECT passw FROM Students WHERE cod_stud = ?",
          [username]
        );
        tempPassword = tempPassword[0].passw;
        if (tempPassword == password) {
          done(null, user, req.flash("success", "Welcome " + user.nameE));
        } else {
          done(null, false, req.flash("error", "Incorrect Password"));
        }
      } else {
        return done(null, false, req.flash("error", "User not found"));
      }
    }
  )
);

passport.use(
  "local.login_profesors",
  new LocalStrategy(
    {
      usernameField: "Code",
      passwordField: "Password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      //verifr password with database
      const rows = await pool.query(
        "SELECT * FROM Profesors WHERE cod_prof = ?",
        [username]
      );
      if (rows.length > 0) {
        const user = rows[0];
        var tempPassword = await pool.query(
          "SELECT passw FROM Profesors WHERE cod_prof = ?",
          [username]
        );
        tempPassword = tempPassword[0].passw;
        if (tempPassword == password) {
          done(null, user, req.flash("success", "Welcome " + user.namep));
        } else {
          done(null, false, req.flash("error", "Incorrect Password"));
        }
      } else {
        return done(null, false, req.flash("error", "User not found"));
      }
    }
  )
);

passport.use(
  "local.login_admins",
  new LocalStrategy(
    {
      usernameField: "Code",
      passwordField: "Password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      //verifr password with database
      const user = {
        Code: "admin",
        Name: "Admin",
        Password: "admin",
      };
      if (username == "admin" && password == "admin") {
        done(null, user, req.flash("success", "Welcome Admin"));
      } else {
        return done(null, false, req.flash("error", "User not found"));
      }
    }
  )
);

passport.serializeUser((obj, done) => {
  if (obj.cod_prof === undefined && obj.cod_stud === undefined) {
    done(null, { id: "admin", type: "admin" });
  } else if (obj.cod_stud === undefined) {
    done(null, { id: obj.cod_prof, type: "Profesor" });
  } else {
    done(null, { id: obj.cod_stud, type: "Student" });
  }
});

passport.deserializeUser((obj, done) => {
  if (obj.type === "Student") {
    pool.query(
      "SELECT * FROM Students WHERE cod_stud = ?",
      [obj.id],
      (err, rows) => {
        if (err) {
          done(err);
        } else {
          done(null, rows[0]);
        }
      }
    );
  } else if (obj.type === "Profesor") {
    pool.query(
      "SELECT * FROM Profesors WHERE cod_prof = ?",
      [obj.id],
      (err, rows) => {
        if (err) {
          done(err);
        } else {
          done(null, rows[0]);
        }
      }
    );
  } else {
    done(null, { id: "admin", type: "admin" });
  }
});
