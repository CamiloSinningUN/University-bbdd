const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const programs = await pool.query('SELECT * FROM Programs');
    const departments = await pool.query('SELECT * FROM Departments');
    res.render('admin/programs', { programs,departments});
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Name, Department} = req.body;
    const newProgram = {
        cod_prog: Name,
        cod_dep: Department
    };
    await pool.query('INSERT INTO Programs SET ?', [newProgram]);
    req.flash('success', 'Program saved successfully');
    res.redirect('/admin/programs');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Programs WHERE cod_prog = ?', [id]);
    req.flash('success', 'Program deleted successfully');
    res.redirect('/admin/programs');
});

router.post('/edit/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    const { Name, Department} = req.body;
    const newProgram = {
        cod_prog: Name,
        cod_dep: Department
    };
    await pool.query('UPDATE Programs SET ? WHERE cod_prog = ?', [newProgram, id]);
    req.flash('success', 'Program updated successfully');
    res.redirect('/admin/programs');
});


module.exports = router;