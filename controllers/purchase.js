const Razorpay = require('razorpay');
const Order = require('../models/order');
require('dotenv').config();


exports.purchasePremium = async (req, res, next) => {
    try {
        var rzrPay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const amount = 25050;
        const currency = "INR";

        rzrPay.orders.create({amount, currency}, (err, order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid: order.id, status:'Pending'}).then(() => {
                return res.status(201).json({order, key_id: rzrPay.key_id});
            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch (err){
        console.log(err)
        res.status(403).json({message: "Something Went Wrong"});
    }
};

exports.updateTransaction = (req, res) => {
    try {
        const {payment_id, order_id} = req.body;
        Order.findOne({where : {orderid: order_id}}).then(order => {
            order.update({paymentid: payment_id, status: 'Successful'}).then(() => {
                req.user.update({ispremiumuser: true}).then(()=> {
                    return res.status(202).json({success: true, message: "Transaction Successful"});
                }).catch((err) => {
                    throw new Error(err);
                })
            }).catch((err) => {
                throw new Error(err);
            })
        }).catch((err) => {
            throw new Error(err);
        })
    } catch(err) {
        throw new Error(err);
    };
}
