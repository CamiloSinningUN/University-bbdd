const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const subjects = await pool.query('SELECT * FROM Subjects');
    const departments = await pool.query('SELECT * FROM Departments');
    res.render('admin/subjects', { subjects, departments});
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code, Name, Department} = req.body;
    const newSubject = {
        cod_sub:Code,
        namesub:Name,
        cod_depart:Department
    };
    await pool.query('INSERT INTO Subjects SET ?', [newSubject]);
    req.flash('success', 'Subject saved successfully');
    res.redirect('/admin/subjects');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Subjects WHERE cod_sub = ?', [id]);
    req.flash('success', 'Subject deleted successfully');
    res.redirect('/admin/subjects');
});

router.post('/edit/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    const { Code, Name, Department} = req.body;
    const newSubject = {
        cod_sub:Code,
        namesub:Name,
        cod_depart:Department
    };
    await pool.query('UPDATE Subjects SET ? WHERE cod_sub = ?', [newSubject, id]);
    req.flash('success', 'Subject updated successfully');
    res.redirect('/admin/subjects');
});


module.exports = router;