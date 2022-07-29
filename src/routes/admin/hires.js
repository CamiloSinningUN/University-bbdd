const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const hires = await pool.query('SELECT * FROM Hires');
    const study_plans = await pool.query('SELECT * FROM Studyplans');
    const students = await pool.query('SELECT * FROM Students');
    res.render('admin/hires', { hires, study_plans, students });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code_st, Code_sp} = req.body;
    const newHire = {
        cod_stud: Code_st,
        cod_sp: Code_sp
    };
    await pool.query('INSERT INTO Hires SET ?', [newHire]);
    req.flash('success', 'Relation saved successfully');
    res.redirect('/admin/hires');
});

router.get('/delete/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1,id2 } = req.params;
    await pool.query('DELETE FROM Hires WHERE cod_stud = ? and cod_sp = ?', [id1, id2]);
    req.flash('success', 'Relation deleted successfully');
    res.redirect('/admin/hires');
});

router.post('/edit/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1, id2 } = req.params;
    const { Code_st, Code_sp} = req.body;
    const newHire = {
        cod_stud: Code_st,
        cod_sp: Code_sp
    };
    await pool.query('UPDATE Hires SET ? WHERE cod_stud = ? and cod_sp = ?', [newHire, id1, id2]);
    req.flash('success', 'Relation updated successfully');
    res.redirect('/admin/hires');
});


module.exports = router;