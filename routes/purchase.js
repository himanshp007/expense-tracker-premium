const express = require('express');
const userauth = require('../middleware/auth');

const router = express.Router()

const purchaseController = require('../controllers/purchase');

router.get('/premiummembership', userauth.authenticate, purchaseController.purchasePremium);
router.post('/updatetransactionstatus', userauth.authenticate, purchaseController.updateTransaction);

module.exports = router;