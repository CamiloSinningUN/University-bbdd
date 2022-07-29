const router = require("express").Router();
const pool = require("../../database");
const { isLoggedStudent } = require('../../lib/auth');

router.get("/", isLoggedStudent, async (req, res) => {
  const cursos = await pool.query(
    `with recursive 
    matricula as (
    select e.num_enroll as n
    from Enrollments as e
    where cod_stud = ?
    ),
    n as(
    select r.NRC as nc
    from Register as r cross join matricula
    where matricula.n=r.num_enroll
    ),
    cursos as(
    select *
    from courses as c inner join n
    where n.nc = c.NRC
    )
select  subjects.cod_depart, nc, namesub, namep,lastname, cod_pa
from cursos inner join Subjects on cursos.cod_sub = Subjects.cod_sub 
inner join instructs on instructs.NRC = cursos.nc 
inner join profesors on profesors.cod_prof= instructs.cod_prof`,
    [req.user.cod_stud]
  );
  if (cursos.length > 0) {
    res.render("student/subjects", {
      cursos,
    });
  }
});

module.exports = router;
