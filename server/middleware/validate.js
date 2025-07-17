// the common error handler middleware 
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));

        return res.status(422).json({
            success: false,
            errors: extractedErrors,
        });
    }

    next();
};