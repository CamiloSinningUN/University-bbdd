const router = require('express').Router();
const pool = require('../../database');
const { isLoggedAdmin } = require('../../lib/auth');

router.get('/',isLoggedAdmin, async (req, res) => {
    const meetings = await pool.query('SELECT * FROM Meetings');
    const profesors = await pool.query('SELECT * FROM Profesors');
    const classrooms = await pool.query('SELECT * FROM Classrooms');
    const schedules = await pool.query('SELECT * FROM Schedules');
    res.render('admin/meetings', { meetings, profesors, classrooms, schedules});
});

router.post('/add',isLoggedAdmin, async (req, res) => {
    var { Code, Code_c, Code_p, prof_number, stud_number, Schedule, today} = req.body;
    var schedule_tep = Schedule.split("/");
    const newMeeting = {
        cod: Code,
        today,
        prof_number,
        stud_number,
        cod_class: Code_c,
        cod_prof: Code_p,
        dates: schedule_tep[0],
        st_time: schedule_tep[1],
        fin_time: schedule_tep[2],
        NRC: schedule_tep[3]
    };
    await pool.query('INSERT INTO Meetings SET ?', [newMeeting]);
    req.flash('success', 'Meeting added successfully');
    res.redirect('/admin/meetings');
});

router.get('/delete/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM Meetings WHERE cod = ?', [id]);
    req.flash('success', 'Meeting deleted successfully');
    res.redirect('/admin/meetings');
});

router.post('/edit/:id',isLoggedAdmin, async (req, res) => {
    const { id } = req.params;
    var { Code, Code_c, Code_p, prof_number, stud_number, Schedule, today} = req.body;
    var schedule_tep = Schedule.split("/");
    const newMeeting = {
        cod: Code,
        prof_number,
        stud_number,
        today,
        cod_class: Code_c,
        cod_prof: Code_p,
        dates: schedule_tep[0],
        st_time: schedule_tep[1],
        fin_time: schedule_tep[2],
        NRC: schedule_tep[3]
    };
    await pool.query('UPDATE Meetings SET ? WHERE cod = ?', [newMeeting, id]);
    req.flash('success', 'Meeting updated successfully');
    res.redirect('/admin/meetings');
});


module.exports = router;