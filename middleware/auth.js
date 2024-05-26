
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) throw new Error('Authorization token not found');

        const user = jwt.verify(token, '564s64646sfdsf86ssdg684sd5fs4f5sf86s41fs6csa6dae6d5fs45');
        
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
