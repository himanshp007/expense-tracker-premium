const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const expenseController = require('../controllers/add-expense');
const userauth = require('../middleware/auth');

router.post('/signup', userController.postUser);

router.post('/login', userController.postLoginUser);

router.get('/download', userauth.authenticate, expenseController.downloadExpense)

module.exports = router;