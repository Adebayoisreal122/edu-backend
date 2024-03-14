const express = require('express');
const router = express.Router();
const {usersignUp, usersignIn, usersendVerification, usersendOTP} = require('../controllers/user.controller');

router.post('/usersignup', usersignUp);
router.post('/usersignin', usersignIn);
router.post('/usersend-verification', usersendVerification);
router.post('/usersend-otp', usersendOTP);







module.exports = router;
