const express = require('express');
const router = express.Router();
const {usersignUp, usersignIn, usersendVerification, usersendOTP} = require('../controllers/user.controller');

router.post('/user/usersignup', usersignUp);
router.post('/user/usersignin', usersignIn);
router.post('/user/usersend-verification', usersendVerification);
router.post('/user/usersend-otp', usersendOTP);



module.exports = router;
