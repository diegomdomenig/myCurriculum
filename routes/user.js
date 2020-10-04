const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/users');

router.post('/anonymous',
    body('anonymous')
    .custom((value, {req}) => {
        if(value != 'on' && value !='off') {
            throw new Error('Anonymous fricked up');
        }
        return true;
    }),
    userController.postAnonymous);

router.get('/account', userController.getAccount);

module.exports = router;