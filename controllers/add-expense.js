const Expense = require("../models/add-expense");
const User = require('../models/user');
const DownloadedFiles = require('../models/downloadedfiles');
const sequelize = require("../utils/database");
const S3Services = require("../services/s3services");



exports.downloadExpense = async (req, res) => {
    try {

        console.log('inside ctrl')
        const userid = req.user.id;
        const expenses = await req.user.getExpenses();
        const stringified = JSON.stringify(expenses);
        const filename = `Expense${userid}/${new Date().toISOString()}.txt`;
        const fileUrl = await S3Services.uploadToS3(stringified, filename);
        await DownloadedFiles.create({
            url: fileUrl,
            userId: userid
        });
        console.log(fileUrl)
        res.status(200).json({ url: fileUrl });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


exports.postExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {

        if (!req.body.amount) {
            throw new Error ("Please Add Amount Before proceeding");
        };

        const {amount, description, category} = req.body;

        await req.user.createExpense({
            amount:amount,
            description: description,
            category: category
        }, 
        {transaction: t}
        )

        const total = Number(req.user.totalExpense || 0) + Number(amount);
        await User.update({
            totalExpense: total
        },{
            where:{id: req.user.id},
            transaction: t
        })

        await t.commit()
        res.status(200).json({message: "Expense Added Successfully!"})
    } catch (err){
        await t.rollback()
        res.status(500).json({message: "Something went wrong"});
    }
};


exports.getExpense = async (req, res, next) => {
    try {
        const expenses = await req.user.getExpenses();
        const user = await User.findOne({ where: { id: req.user.id } });
        const premium = user.ispremiumuser;

        res.status(200).json({ result: expenses, premiumuserCheck: premium });
    } catch (err) {
        console.error("Error fetching expenses:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};



exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
        const expenseId = req.params.Id;

        const expense = await Expense.findOne({where: {id: expenseId, userId: req.user.id}})
        const total = Number(req.user.totalExpense) - Number(expense.amount)

        await User.update({
            totalExpense: total
        },{
            where:{id: req.user.id},
            transaction: t
        })

        await expense.destroy({
            transaction: t
        });

        await t.commit();
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (err) {
        await t.rollback();
        res.status(500).json({ error : err.message });
    }
};



