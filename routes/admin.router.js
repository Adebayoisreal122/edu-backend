const express = require('express');
const router = express.Router();
const {adminsignUp, adminsignIn, adminsendVerification, adminsendOTP } = require('../controllers/admin.controller');




router.post('/admin/adminsignup', adminsignUp);
router.post('/admin/adminsignin', adminsignIn);
router.post('/admin/adminsend-verification', adminsendVerification);
router.post('/admin/adminsend-otp', adminsendOTP);


module.exports = router;
