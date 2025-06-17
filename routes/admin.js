const express = require('express')
const router = express.Router();
const adminController = require('../controller/adminController')
const adminAuth = require('../middleware/adminAuth')


router.get('/login',adminAuth.isLogin,adminController.loadLogin)
router.post('/login',adminController.login)
router.get('/dashboard',adminAuth.checkSession,adminController.loadDashboard)
router.get('/add-user', adminAuth.checkSession, adminController.loadAddUserPage);
router.post('/add-user', adminAuth.checkSession, adminController.addUser);
router.post('/edit-user', adminController.editUser);
router.get('/delete/:id', adminController.deleteUser);





module.exports = router