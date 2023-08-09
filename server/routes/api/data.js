const express = require('express');
const router = express.Router();
const alldataController = require('../../controllers/alldataController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
.get(alldataController.getAllData)
.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), alldataController.createNewData)
.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), alldataController.updateData)
.delete(verifyRoles(ROLES_LIST.Admin), alldataController.deleteData);

router.route('/:id')
.get(alldataController.getData);

module.exports = router;