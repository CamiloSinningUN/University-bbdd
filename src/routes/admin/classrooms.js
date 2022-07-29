const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const classrooms = await pool.query('SELECT * FROM Classrooms');
    res.render('admin/classrooms', { classrooms});
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code, TimeStamp} = req.body;
    const newClassroom = {
        cod_class:Code,
        timec:new Date(TimeStamp).toISOString().slice(0, 19).replace('T', ' ')
    };
    await pool.query('INSERT INTO Classrooms SET ?', [newClassroom]);
    req.flash('success', 'Classroom saved successfully');
    res.redirect('/admin/classrooms');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Classrooms WHERE cod_class = ?', [id]);
    req.flash('success', 'Classroom deleted successfully');
    res.redirect('/admin/classrooms');
});

router.post('/edit/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    const { Code, TimeStamp} = req.body;
    const newClassroom = {
        cod_class:Code,
        timec:new Date(TimeStamp).toISOString().slice(0, 19).replace('T', ' ')
    };
    await pool.query('UPDATE Classrooms SET ? WHERE cod_class = ?', [newClassroom, id]);
    req.flash('success', 'Classroom updated successfully');
    res.redirect('/admin/classrooms');
});


module.exports = router;