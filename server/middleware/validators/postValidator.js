// express-validator - ensures that when someone tries to create or update a post,
//  the data is clean and valid

// use pnpm add express-validator

const { body } = require('express-validator');

exports.validatePost = [
    body('title')
        .trim() // remove any whitespaces
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 100 }).withMessage('Title must be under 100 characters'),
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required'),

    body('author')
        .notEmpty().withMessage('Author ID is required'),

    body('category')
        .notEmpty().withMessage('Category ID is required'),
]; 