const router = require("express").Router();
const pool = require("../../database");
const { isLoggedStudent } = require('../../lib/auth');
router.get("/:nc", isLoggedStudent, async (req, res) => {
  const { nc } = req.params;
  const lista = await pool.query(
    `with recursive 
    curso as (
    select e.cod_stud as cod
	from enrollments as e inner join register as r on e.num_enroll = r.num_enroll 
    where r.NRC = ?
    )
select nameE, lastname
from curso inner join students on students.cod_stud=curso.cod`,
    [nc]
  );
  console.log(lista);
  if (lista.length > 0) {
    res.render("student/schedules", {
      lista,
    });
  }
});

module.exports = router;
