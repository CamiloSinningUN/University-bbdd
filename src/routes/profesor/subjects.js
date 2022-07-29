const router = require("express").Router();
const pool = require("../../database");
const { isLoggedStudent, isLoggedProfesor } = require('../../lib/auth');

router.get("/", isLoggedProfesor, async (req, res) => {
  const cursos = await pool.query(
    `select  s.cod_depart, c.NRC, s.namesub, c.cod_pa
from instructs as i inner join courses as c on c.NRC=i.NRC inner join subjects as s on s.cod_sub= c.cod_sub where i.cod_prof=?`,
    [req.user.cod_prof]
  );
  console.log(cursos);
  if (cursos.length > 0) {
    res.render("profesor/subjects", {
      cursos,
    });
  } else {
    req.flash('message', 'error: courses not found')
    res.render("profesor/subjects", {
      cursos,
    });
  }
});

module.exports = router;
