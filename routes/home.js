const express = require('express');

const homeController = require('../controllers/courses');

const router = express.Router();

router.get('/', homeController.getHome);

module.exports = router;
