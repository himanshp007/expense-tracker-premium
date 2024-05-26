const express = require('express');

const router = express.Router();

const premiumController = require('../controllers/premium');
const userauth = require('../middleware/auth');

router.get('/showleaderboard',userauth.authenticate, premiumController.showLeaderboard);

module.exports = router;