const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const enrollments = await pool.query('SELECT * FROM Enrollments');
    const students = await pool.query('SELECT * FROM Students');
    const periods = await pool.query('SELECT * FROM Periods');
    res.render('admin/enrollments', { enrollments, students,periods });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code, Student,Period} = req.body;
    const newEnrollment = {
        num_enroll:Code,
        cod_stud:Student,
        cod_pa:Period
    };
    await pool.query('INSERT INTO Enrollments SET ?', [newEnrollment]);
    req.flash('success', 'Enrollment saved successfully');
    res.redirect('/admin/enrollments');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Enrollments WHERE num_enroll = ?', [id]);
    req.flash('success', 'Enrollment deleted successfully');
    res.redirect('/admin/enrollments');
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { Code, Student,Period} = req.body;
    const newEnrollment = {
        num_enroll:Code,
        cod_stud:Student,
        cod_pa:Period
    };
    await pool.query('UPDATE Enrollments SET ? WHERE num_enroll = ?', [newEnrollment, id]);
    req.flash('success', 'Enrollment updated successfully');
    res.redirect('/admin/enrollments');
});


module.exports = router;