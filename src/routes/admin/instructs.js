const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const instructs = await pool.query('SELECT * FROM Instructs');
    const courses = await pool.query('SELECT * FROM Courses');
    const profesors = await pool.query('SELECT * FROM Profesors');
    res.render('admin/instructs', { instructs, courses, profesors });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { NRC, Profesor} = req.body;
    const newInstruct = {
        NRC,
        cod_prof: Profesor
    };
    await pool.query('INSERT INTO Instructs SET ?', [newInstruct]);
    req.flash('success', 'Relation saved successfully');
    res.redirect('/admin/instructs');
});

router.get('/delete/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1,id2 } = req.params;
    await pool.query('DELETE FROM Instructs WHERE NRC = ? and cod_prof = ?', [id1, id2]);
    req.flash('success', 'Relation deleted successfully');
    res.redirect('/admin/instructs');
});

router.post('/edit/:id1/:id2',isLoggedAdmin, async (req, res) => {
    const { id1, id2 } = req.params;
    const { NRC, Profesor} = req.body;
    const newInstruct = {
        NRC,
        cod_prof: Profesor
    };
    await pool.query('UPDATE Instructs SET ? WHERE NRC = ? and cod_prof = ?', [newInstruct, id1, id2]);
    req.flash('success', 'Relation updated successfully');
    res.redirect('/admin/instructs');
});


module.exports = router;