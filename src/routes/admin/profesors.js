const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const profesors = await pool.query('SELECT * FROM Profesors');
    const departments = await pool.query('SELECT * FROM Departments');
    res.render('admin/profesors', { profesors, departments });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code, Name, Last_name, Password, Department } = req.body;
    const newProfesor = {
        cod_prof: Code,
        namep:Name,
        lastname: Last_name,
        cod_dep:Department,
        passw: Password
    };
    await pool.query('INSERT INTO Profesors SET ?', [newProfesor]);
    req.flash('success', 'Profesor saved successfully');
    res.redirect('/admin/profesors');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Profesors WHERE cod_prof = ?', [id]);
    req.flash('success', 'Profesor deleted successfully');
    res.redirect('/admin/profesors');
});

router.post('/edit/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    const { Code, Name, Last_name, Password, Department } = req.body;
    const newProfesor = {
        Cod_prof: Code,
        Namep:Name,
        lastname: Last_name,
        Cod_dep:Department,
        passw: Password
    };
    await pool.query('UPDATE Profesors SET ? WHERE cod_prof = ?', [newProfesor, id]);
    req.flash('success', 'Profesor updated successfully');
    res.redirect('/admin/profesors');
});


module.exports = router;