const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const composes = await pool.query('SELECT * FROM Compose');
    const study_plans = await pool.query('SELECT * FROM Studyplans');
    const subjects = await pool.query('SELECT * FROM Subjects');
    res.render('admin/composes', { composes, study_plans, subjects });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code_p, Code_s, Semester} = req.body;
    const newCompose = {
        cod_sp: Code_p,
        cod_sub: Code_s,
        semester: Semester
    };
    await pool.query('INSERT INTO Compose SET ?', [newCompose]);
    req.flash('success', 'Relation saved successfully');
    res.redirect('/admin/composes');
});

router.get('/delete/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1,id2 } = req.params;
    await pool.query('DELETE FROM Compose WHERE cod_sp = ? and cod_sub = ?', [id1, id2]);
    req.flash('success', 'Relation deleted successfully');
    res.redirect('/admin/composes');
});

router.post('/edit/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1, id2 } = req.params;
    const { Code_p, Code_s, Semester} = req.body;
    const newCompose = {
        cod_sp: Code_p,
        cod_sub: Code_s,
        semester: Semester
    };
    await pool.query('UPDATE Compose SET ? WHERE cod_sp = ? and cod_sub = ?', [newCompose, id1, id2]);
    req.flash('success', 'Relation updated successfully');
    res.redirect('/admin/composes');
});


module.exports = router;