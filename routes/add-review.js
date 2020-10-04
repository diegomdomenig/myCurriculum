const express = require('express');
const { body } = require('express-validator');

const reviewController = require('../controllers/reviews');

const router = express.Router();

router.get('/review/:courseUrl', reviewController.getReview);

router.post('/review', 
    [ body('review')
    .isAscii()
    .custom((value, {req}) => {
        if(value.length < 1 || value.length > 500) {
            throw new Error("Review fricked up");
        }
        return true;
    }),
    body('courseId')
    .isAlphanumeric(),
    body('star')
    .isInt()
    .custom((value, {req}) => {
        if(value < 1 || value > 5) {
            throw new Error("Rating fricked up");
        }
        return true;
    }),
    body('login')
    .custom((value, {req}) => {
        if(value != "true" && value != "false") {
            throw new Error("Login fricked up");
        }
        return true;
    }),
    body('edit')
    .custom((value, {req}) => {
        if(value != "true" && value != "false") {
            throw new Error("Login fricked up");
        }
        return true;
    })
    ],
reviewController.postReview);

router.post('/upvote',
    [ body('action')
    .custom((value, {req}) => {
        if(value != "upvote" && value != "downvote" && value != "login") {
            throw new Error("Action fricked up");
        }
        return true
    }),
    body('reviewUser')
    .isAlphanumeric(),
    body('reviewId')
    .isAlphanumeric(),
    body('courseId')
    .isAlphanumeric()
],
reviewController.postUpvote);

router.post('/deleteReview',
    [ body('reviewId')
    .isAlphanumeric(),
    body('userId')
    .isAlphanumeric(),
    body('courseId')
    .isAlphanumeric(),
    body('login')
    .custom((value, {req}) => {
        if(value != "true" && value != "false") {
            throw new Error("login fricked up");
        }
        return true
    }),
],
reviewController.deleteReview);

router.post('/report',
    [ body('reviewId')
    .isAlphanumeric(),
    body('userId')
    .isAlphanumeric(),
    body('courseId')
    .isAlphanumeric(),
    body('login')
    .custom((value, {req}) => {
        if(value != "true" && value != "false") {
            throw new Error("login fricked up");
        }
        return true
    }),
],
reviewController.reportReview);


module.exports = router;
