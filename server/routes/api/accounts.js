const express = require('express');
const router = express.Router();
const accountsController = require('../../controllers/accountsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/')
.get( accountsController.getAllAccounts)
.delete(verifyRoles(ROLES_LIST.Admin), accountsController.deleteAccount);



router.route('/:id')
.get(accountsController.getAccount);


module.exports = router;