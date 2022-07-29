const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const departments = await pool.query('SELECT * FROM Departments');
    res.render('admin/departments', { departments});
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code, Name} = req.body;
    const newDepartment = {
        cod_Depart: Code,
        named:Name
    };
    await pool.query('INSERT INTO Departments SET ?', [newDepartment]);
    req.flash('success', 'Departments saved successfully');
    res.redirect('/admin/departments');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Departments WHERE cod_Depart = ?', [id]);
    req.flash('success', 'Department deleted successfully');
    res.redirect('/admin/departments');
});

router.post('/edit/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    const { Code, Name } = req.body;
    const newDepartment = {
        cod_Depart: Code,
        named:Name
    };
    await pool.query('UPDATE Departments SET ? WHERE cod_Depart = ?', [newDepartment, id]);
    req.flash('success', 'Departaments updated successfully');
    res.redirect('/admin/departments');
});


module.exports = router;