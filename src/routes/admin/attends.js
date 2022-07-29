const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const attends = await pool.query('SELECT * FROM Attends');
    const students = await pool.query('SELECT * FROM Students');
    const meetings = await pool.query('SELECT * FROM Meetings');
    res.render('admin/attends', { attends, students, meetings });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code, Code_p, state} = req.body;
    const newAttend = {
        cod: Code,
        cod_stud: Code_p,
        state
    };
    await pool.query('INSERT INTO Attends SET ?', [newAttend]);
    req.flash('success', 'Relation added successfully');
    res.redirect('/admin/attends');
});

router.get('/delete/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1,id2 } = req.params;
    await pool.query('DELETE FROM Attends WHERE cod = ? and cod_stud = ?', [id1, id2]);
    req.flash('success', 'Relation deleted successfully');
    res.redirect('/admin/attends');
});

router.post('/edit/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1,id2 } = req.params;
    const { Code, Code_p, state} = req.body;
    const newAttend = {
        cod: Code,
        cod_stud: Code_p,
        state
    };
    await pool.query('UPDATE Attends SET ? WHERE cod = ? and cod_stud = ?', [newAttend, id1,id2]);
    req.flash('success', 'Relation updated successfully');
    res.redirect('/admin/attends');
});


module.exports = router;