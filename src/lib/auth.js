module.exports={
    isLoggedAdmin: function(req, res, next) {
        if ((req.isAuthenticated()) && (req.user.type == 'admin')) {
            return next();
        }
        return res.redirect('/');
    },
    isNotLoggedAdmin: function(req, res, next) {
        if (!((req.isAuthenticated()) && (req.user.type == 'admin'))) {
            return next();
        }
        return res.redirect('/admin/students');
    },
    isLoggedStudent: function(req, res, next) {
        if ((req.isAuthenticated()) && (req.user.cod_stud !== undefined)) {
            return next();
        }
        return res.redirect('/');
    },
    isNotLoggedStudent: function(req, res, next) {
        if (!((req.isAuthenticated()) && (req.user.cod_stud !== undefined))) {
            return next();
        }
        return res.redirect('/student');
    },
    isLoggedProfesor: function(req, res, next) {
        if ((req.isAuthenticated()) && (req.user.cod_prof !== undefined)) {
            return next();
        }
        return res.redirect('/');
    },
    isNotLoggedProfesor: function(req, res, next) {
        if (!((req.isAuthenticated()) && (req.user.cod_prof !== undefined))) {
            return next();
        }
        return res.redirect('/profesor');
    }
};