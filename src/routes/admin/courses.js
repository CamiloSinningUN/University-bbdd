const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const courses = await pool.query('SELECT * FROM Courses');
    const subjects = await pool.query('SELECT * FROM Subjects');
    const periods = await pool.query('SELECT * FROM Periods');
    res.render('admin/courses', { courses, subjects, periods });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { NRC, Subject, Period} = req.body;
    const newCourse = {
        NRC,
        cod_sub:Subject,
        cod_pa:Period
    };
    await pool.query('INSERT INTO Courses SET ?', [newCourse]);
    req.flash('success', 'Course added succesfully');
    res.redirect('/admin/courses');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Courses WHERE NRC = ?', [id]);
    req.flash('success', 'Course deleted succesfully');
    res.redirect('/admin/courses');
});

router.post('/edit/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    const { NRC, Subject, Period} = req.body;
    const newCourse = {
        NRC,
        cod_sub:Subject,
        cod_pa:Period
    };
    await pool.query('UPDATE Courses SET ? WHERE NRC = ?', [newCourse, id]);
    req.flash('success', 'Course edited succesfully');
    res.redirect('/admin/courses');
});


module.exports = router;