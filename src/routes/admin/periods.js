const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const periods = await pool.query('SELECT * FROM Periods');
    res.render('admin/periods', { periods});
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Code, Description} = req.body;
    const newPeriod = {
        cod_pa: Code,
        desciption:Description
    };
    await pool.query('INSERT INTO Periods SET ?', [newPeriod]);
    req.flash('success', 'Period saved successfully');
    res.redirect('/admin/periods');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Periods WHERE cod_pa = ?', [id]);
    req.flash('success', 'Period deleted successfully');
    res.redirect('/admin/periods');
});

router.post('/edit/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    const { Code, Description } = req.body;
    const newPeriod = {
        cod_pa: Code,
        desciption:Description
    };
    await pool.query('UPDATE Periods SET ? WHERE cod_pa = ?', [newPeriod, id]);
    req.flash('success', 'Period updated successfully');
    res.redirect('/admin/periods');
});


module.exports = router;