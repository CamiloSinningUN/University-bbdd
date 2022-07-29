const router = require('express').Router();
const {isNotLoggedAdmin,isNotLoggedStudent,isNotLoggedProfesor} = require('../lib/auth');

router.get('/',isNotLoggedAdmin,isNotLoggedStudent,isNotLoggedProfesor,(req, res)=>{
    req.logout();
    res.render('index');
})

module.exports = router;