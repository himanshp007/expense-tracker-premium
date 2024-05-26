const express = require('express');
const router = express.Router();

const passowrdController = require('../controllers/password');

router.post('/forgotpassword', passowrdController.resetPassword);
router.get('/resetpassword/:requestId', passowrdController.verifyingResetLink);
router.post('/verifypassword/:requestId', passowrdController.finalizingReset);

module.exports = router;