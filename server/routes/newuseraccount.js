const express = require('express');
const router = express.Router();
const createaccountController = require('../controllers/createaccountController');

router.post('/', createaccountController.handleNewUser);

module.exports = router;