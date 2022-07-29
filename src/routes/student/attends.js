const router = require('express').Router();
const pool = require('../../database');
const { isLoggedStudent } = require('../../lib/auth');

router.post('/add', isLoggedStudent, async (req, res) => {
    const { Code_s, Code_p } = req.body;
    // if it is equal to the meeting atribute then add to attends
    const Mettings = await pool.query(`select * from Meetings where stud_number = ? and  prof_number = ?`, [Code_s, Code_p]);
    const today = new Date();
    if (Mettings.length > 0) {
        var state;
        const hour = today.getHours();
        const minute = today.getMinutes();
        var date = Mettings[0].st_time.split(":")
        console.log(Mettings);
        console.log(hour);
        console.log(date[0]);
        console.log(date[1]);
        if(hour == date[0] && minute - parseInt(date[1]) > 10){
            state = '+';
        } else {
            state = '';
        }
        const newAttend = {
            cod: Mettings[0].cod,
            cod_stud: req.user.cod_stud,
            state: state
        };
        await pool.query('INSERT INTO Attends SET ?', [newAttend]);
        req.flash('success', 'You have been added to the meeting');
        res.redirect('/student');
    } else {
        req.flash('message', 'Meeting not founded');
        res.redirect('/student');
    }
});


module.exports = router;
