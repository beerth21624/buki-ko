const express = require('express');
const router = express.Router();
const { createSubBill, getAllSubBill } = require('../controllers/subBill');

router.route('/create').post(createSubBill);
router.route('/getallsubbill').get(getAllSubBill);

module.exports = router;
