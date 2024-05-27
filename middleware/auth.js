
const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const authenticate = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) throw new Error('Authorization token not found');

        const user = jwt.verify(token, process.env.USER_TOKEN);
        
        User.findByPk(user.userId)
            .then(user => {
                if (!user) throw new Error('User not found');
                req.user = user;
                next();
            })
            .catch(err => {
                next(err);
            });
    } catch (err) {
        return res.status(401).json({ success: false, message: err.message });
    }
};

module.exports = {
    authenticate
};
