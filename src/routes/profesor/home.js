const router = require('express').Router();
const pool = require('../../database');
const { isLoggedProfesor } = require('../../lib/auth');

router.get('/', isLoggedProfesor, async (req, res) => {
    const Course_now = await pool.query(`with recursive
    c as (
    select *
    from Instructs 
    where cod_prof = ?
    ),
    h as (
    select c.NRC
    from c inner join Schedules as s on c.NRC = s.NRC
    where dates = DAYNAME(curdate()) and s.st_time <= curtime() and s.fin_time >= curtime()
    )
    
    select co.*
    from Courses as co inner join h on co.NRC = h.NRC;`, [req.user.cod_prof]);
    console.log(Course_now)
    if (Course_now.length > 0) {
        const subjects = await pool.query(`select * from Courses as c inner join Subjects as s on c.cod_sub = s.cod_sub where c.NRC = ?`, [Course_now[0].NRC]);
        const profesors = await pool.query(`select * from Profesors  as p inner join Instructs as c on p.cod_prof = c.cod_prof where c.NRC = ?`, [Course_now[0].NRC]);
        const d = new Date();
        const weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        let day = weekday[d.getDay()];
        const schedules = await pool.query(`select * from Schedules as s where NRC = ? and dates = ?`, [Course_now[0].NRC, day]);
        const subject = subjects[0];
        const profesor = profesors[0];
        const course = Course_now[0];
        const schedule = schedules[0];
        const meetings = await pool.query(`select * from Meetings as m  where m.NRC = ? and m.today = ? `, [Course_now[0].NRC, new Date().toISOString().split('T')[0]]);
        const meeting = meetings[0];
        console.log('dasdasdas')
        if (meetings.length > 0) {
            const students = await pool.query(`select * from Attends as a inner join Students as s on a.cod_stud = s.cod_stud where cod = ?`, [meeting.cod]);
            res.render('profesor/home', {
                subject,
                profesor,
                course,
                schedule,
                meeting,
                students
            });
        } else {
            res.render('profesor/home', {
                subject,
                profesor,
                course,
                schedule
            });
        }
    } else {
        res.render('profesor/home');
    }
});

module.exports = router;