const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const study_plans = await pool.query('SELECT * FROM Studyplans');
    const programs = await pool.query('SELECT * FROM Programs');
    res.render('admin/study_plans', { study_plans, programs});
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code, Program} = req.body;
    const newStudy_plan = {
        cod_sp:Code,
        cod_program:Program
    };
    await pool.query('INSERT INTO Studyplans SET ?', [newStudy_plan]);
    req.flash('success', 'Study plan saved successfully');
    res.redirect('/admin/study_plans');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Studyplans WHERE cod_sp = ?', [id]);
    req.flash('success', 'Study plan deleted successfully');
    res.redirect('/admin/study_plans');
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { Code, Program} = req.body;
    const newStudy_plan = {
        cod_sp:Code,
        cod_program:Program
    };
    await pool.query('UPDATE Studyplans SET ? WHERE cod_sp = ?', [newStudy_plan, id]);
    req.flash('success', 'Study plan updated successfully');
    res.redirect('/admin/study_plans');
});


module.exports = router;