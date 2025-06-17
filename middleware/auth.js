

const checkSession =(req,res,next)=>{
    if(req.session.user){
        next()
    }else{
            res.redirect('/user/login')
        }
    }


    const isLogin = (req, res, next) => {
        if (req.session.user) {
            res.redirect('/user/userHome')
        } else {
            next()
        }
    };

    function isAuthenticated(req, res, next) {
        if (req.session && req.session.user) {
            next();
        } else {
            res.redirect('/user/login');
        }
    }

    
module.exports = {
    checkSession,
    isLogin,
    isAuthenticated
}
