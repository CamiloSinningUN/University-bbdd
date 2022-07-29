const router = require("express").Router();
const pool = require("../../database");
const { isLoggedStudent, isLoggedProfesor } = require('../../lib/auth');
router.get("/:NRC", isLoggedProfesor, async (req, res) => {
  const { NRC } = req.params;
  const curso = await pool.query(
    `select st.cod_stud, st.nameE,st.lastname, count(st.cod_stud) as assis,sum(a.state='+') as late,sum(a.state='') as gt
from meetings as m
inner join courses as c on c.NRC=m.NRC
inner join subjects as s on s.cod_sub= c.cod_sub
inner join attends as a on a.cod=m.cod
inner join students as st on st.cod_stud= a.cod_stud
where m.NRC=?
group by st.cod_stud, st.nameE,st.lastname, a.state`,
    [NRC]
  );
  console.log(curso);
  if (curso.length > 0) {
    res.render("profesor/schedules", {
      curso,
    });
  }else{
    req.flash('success', 'Meetings not found')
    res.redirect('/profesor/subjects');
  }
});

module.exports = router;
