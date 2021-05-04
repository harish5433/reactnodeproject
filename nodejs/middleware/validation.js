const { check, validationResult } = require('express-validator');
exports.validLogIn = [
    check('email', 'Email is required').notEmpty()
    .isEmail().withMessage('email is not valid'),
    check('password', 'Password is required').notEmpty()
]
exports.isValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()})
    }
    next();
}