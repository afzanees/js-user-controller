const checkSession = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

const isLogin = (req, res, next) => {
    if (req.session.admin) {
        return res.redirect('/admin/dashboard'); // ✅ return added
    } else {
        next();
    }
};

module.exports = {
    checkSession,
    isLogin
};
