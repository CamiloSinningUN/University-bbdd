const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const students = await pool.query('SELECT * FROM Students');
    res.render('admin/students', { students });
});

router.post('/add', isLoggedAdmin, async (req, res) => {
    const { Name, Last_name, Code, Password } = req.body;
    const newstudent = {
        cod_stud:Code,
        nameE:Name,
        lastname:Last_name,
        passw:Password
    };
    await pool.query('INSERT INTO Students SET ?', [newstudent]);
    req.flash('success', 'Student saved successfully');
    res.redirect('/admin/students');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Students WHERE cod_stud = ?', [id]);
    req.flash('success', 'Student deleted successfully');
    res.redirect('/admin/students');
});

router.post('/edit/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    const { Name, Last_name, Code, Password } = req.body;
    const newstudent = {
        cod_stud:Code,
        nameE:Name,
        lastname:Last_name,
        passw:Password
    };
    await pool.query('UPDATE Students SET ? WHERE cod_stud = ?', [newstudent, id]);
    req.flash('success', 'Student updated successfully');
    res.redirect('/admin/students');
});


module.exports = router;