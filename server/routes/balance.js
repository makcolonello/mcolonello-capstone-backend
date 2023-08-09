const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');


router.get('/:username', balanceController.handleBalance);




module.exports = router;