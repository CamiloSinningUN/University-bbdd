const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const registers = await pool.query('SELECT * FROM Register');
    const courses = await pool.query('SELECT * FROM Courses'); 
    const enrollments = await pool.query('SELECT * FROM Enrollments');
    res.render('admin/registers', { registers, courses, enrollments });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { NRC, Enrollment} = req.body;
    const newRegister = {
        NRC,
        num_enroll: Enrollment
    };
    await pool.query('INSERT INTO Register SET ?', [newRegister]);
    req.flash('success', 'Relation saved successfully');
    res.redirect('/admin/registers');
});

router.get('/delete/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1,id2 } = req.params;
    await pool.query('DELETE FROM Register WHERE NRC = ? and num_enroll = ?', [id1, id2]);
    req.flash('success', 'Relation deleted successfully');
    res.redirect('/admin/registers');
});

router.post('/edit/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1, id2 } = req.params;
    const { NRC, Enrollment} = req.body;
    const newRegister = {
        NRC,
        num_enroll: Enrollment
    };
    await pool.query('UPDATE Register SET ? WHERE NRC = ? and num_enroll = ?', [newRegister, id1, id2]);
    req.flash('success', 'Relation updated successfully');
    res.redirect('/admin/registers');
});


module.exports = router;