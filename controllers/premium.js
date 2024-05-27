const sequelize = require('sequelize');
const User = require('../models/user');
const Expense = require('../models/add-expense');



exports.showLeaderboard = async (req, res, next) => {
    try {
        const leaderboardDetails = await User.findAll({
            attributes: [
                'id', 
                'name', 
                'totalExpense'
            ],
            order: sequelize.literal('totalExpense DESC')
        });

        res.status(200).json({ result: leaderboardDetails });
    } catch (err) {
        console.log(err);
        res.status(404).json({ result: err });
    }
};


exports.showAllExpenses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.rows) || 5;
        const offset = (page - 1) * limit;

        console.log(limit)

        const expensesData = await req.user.getExpenses({
            limit: limit,
            offset: offset
        });


        const totalCount = await req.user.countExpenses();

        console.log(expensesData)

        res.status(200).json({
            result: expensesData,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ result: err });
    }
};

