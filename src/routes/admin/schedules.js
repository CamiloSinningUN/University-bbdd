const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const schedules = await pool.query('SELECT * FROM Schedules');
    const courses = await pool.query('SELECT * FROM Courses');
    res.render('admin/schedules', { schedules, courses });
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    const { Day, Start_time, End_time, NRC } = req.body;
    const newSchedule = {
        dates: Day,
        st_time: Start_time,
        fin_time: End_time,
        NRC
    };
    await pool.query('INSERT INTO Schedules SET ?', [newSchedule]);
    req.flash('success', 'Schedule saved successfully');
    res.redirect('/admin/schedules');
});

router.get('/delete/:id1/:id2/:id3/:id4',isLoggedAdmin, async (req, res) => {
    var { id1,id2,id3,id4 } = req.params;
    await pool.query('DELETE FROM Schedules WHERE dates = ? and st_time = ? and fin_time = ? and NRC = ?', [id1,id2,id3,id4]);
    req.flash('success', 'Schedule deleted successfully');
    res.redirect('/admin/schedules');
});

router.post('/edit/:id1/:id2/:id3/:id4',isLoggedAdmin, async (req, res) => {
    const { id1,id2,id3,id4 } = req.params;
    const { Day, Start_time, End_time, NRC } = req.body;
    const newSchedule = {
        dates: Day,
        st_time: Start_time,
        fin_time: End_time,
        NRC
    };
    await pool.query('UPDATE Schedules SET ? WHERE dates = ? and st_time = ? and fin_time = ? and NRC = ?', [newSchedule, id1,id2,id3,id4]);
    req.flash('success', 'Schedule updated successfully');
    res.redirect('/admin/schedules');
});


module.exports = router;