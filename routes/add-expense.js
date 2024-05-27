const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/add-expense');
const userauth = require('../middleware/auth');

router.post('/add-expense',userauth.authenticate, expenseController.postExpense);
router.get('/get-expense', userauth.authenticate, expenseController.getExpense);
router.delete('/delete-expense/:Id', userauth.authenticate, expenseController.deleteExpense);

module.exports = router;