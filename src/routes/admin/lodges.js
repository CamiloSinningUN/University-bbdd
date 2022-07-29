const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const lodges = await pool.query('SELECT * FROM Lodge');
    const courses = await pool.query('SELECT * FROM Courses');
    const classrooms = await pool.query('SELECT * FROM Classrooms');
    res.render('admin/lodges', { lodges, courses, classrooms });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { NRC, Classroom} = req.body;
    const newLodge = {
        NRC,
        cod_class: Classroom
    };
    await pool.query('INSERT INTO Lodge SET ?', [newLodge]);
    req.flash('success', 'Relation saved successfully');
    res.redirect('/admin/lodges');
});

router.get('/delete/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1,id2 } = req.params;
    await pool.query('DELETE FROM Lodge WHERE NRC = ? and cod_class = ?', [id1, id2]);
    req.flash('success', 'Relation deleted successfully');
    res.redirect('/admin/lodges');
});

router.post('/edit/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1, id2 } = req.params;
    const { NRC, Classroom} = req.body;
    const newLodge = {
        NRC,
        cod_class: Classroom
    };
    await pool.query('UPDATE Lodge SET ? WHERE NRC = ? and cod_class = ?', [newLodge, id1, id2]);
    req.flash('success', 'Relation updated successfully');
    res.redirect('/admin/lodges');
});


module.exports = router;