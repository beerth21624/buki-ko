const express = require('express');

const router = express.Router();
const {
  createBill,
  getAllBill,
  getAllBillWeapon,
} = require('../controllers/bill');

router.route('/create').post(createBill);
router.route('/getallbill').get(getAllBill);
router.route('/getallweapon').get(getAllBillWeapon);

module.exports = router;
