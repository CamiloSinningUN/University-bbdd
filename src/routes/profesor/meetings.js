const router = require("express").Router();
const pool = require("../../database");
const {isLoggedProfesor} = require("../../lib/auth");

router.post("/add/:prof/:NRC/:weekday/:st_time/:fin_time",isLoggedProfesor, async (req, res) => {
  const { prof, NRC, weekday, st_time, fin_time } = req.params;

  const newMeeting = {
    today: new Date().toISOString().split("T")[0],
    prof_number: Math.floor(Math.random() * (99999999 - 10000000) + 10000000),
    stud_number: Math.floor(Math.random() * (99999999 - 10000000) + 10000000),
    cod_prof: prof,
    dates: weekday,
    st_time,
    fin_time,
    NRC,
  };
  await pool.query("INSERT INTO Meetings SET ?", [newMeeting]);
  res.redirect("/profesor");
});

module.exports = router;
