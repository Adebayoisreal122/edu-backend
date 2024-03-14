const express = require('express');
const router = express.Router();
const {adminsignUp, adminsignIn, adminsendVerification, adminsendOTP } = require('../controllers/admin.controller');




router.post('/adminsignup', adminsignUp);
router.post('/adminsignin', adminsignIn);
router.post('/adminsend-verification', adminsendVerification);
router.post('/adminsend-otp', adminsendOTP);


module.exports = router;
