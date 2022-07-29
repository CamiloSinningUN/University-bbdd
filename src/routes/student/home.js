const router = require('express').Router();
const pool = require('../../database');
const {isLoggedStudent} = require('../../lib/auth');

router.get('/',isLoggedStudent, async (req, res) => {
    const Course_now = await pool.query(`with recursive 
    s as (
    select e.num_enroll as n
    from Enrollments as e
    where cod_stud = ?
    order by cod_pa desc
    limit 1
    ),
    c as (
    select r.NRC
    from Register as r cross join s
    where s.n = r.num_enroll
    ),
    h as (
    select c.NRC
    from c inner join Schedules as s on c.NRC = s.NRC
    where dates = DAYNAME(curdate()) and s.st_time <= curtime() and DATE_ADD(s.st_time, INTERVAL 20 MINUTE) >= curtime()
    )
    select co.*
    from Courses as co inner join h on co.NRC = h.NRC;`, [req.user.cod_stud]);
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
        if (meetings.length > 0) {
            const attends = await pool.query(`select * from Attends where cod_stud = ?`, [req.user.cod_stud]);
            if(attends.length > 0){
                res.render('student/home', {
                    subject,
                    profesor,
                    course,
                    schedule
                });
            }else{
                res.render('student/home', {
                    subject,
                    profesor,
                    course,
                    schedule,
                    meeting,
                    profesor_number: meeting.prof_number,
                    student_number: meeting.stud_number
                });
            }     
        }else{
            res.render('student/home', {
                subject,
                profesor,
                course,
                schedule
            });
        }
    } else {
        res.render('student/home');
    }
});

module.exports = router;