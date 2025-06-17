const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

router.get('/login',auth.isLogin,userController.loadLogin)
router.post('/login',userController.login)
router.get('/register',auth.isLogin,userController.loadRegister)

router.post('/register',userController.registerUser);


router.get('/logout',auth.checkSession,userController.logout)
router.get('/userHome',auth.isAuthenticated,userController.loadHome)
module.exports = router;