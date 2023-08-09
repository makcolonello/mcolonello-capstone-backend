const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');

router.put('/', depositController.deposit);

module.exports = router;