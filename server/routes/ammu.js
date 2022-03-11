const express = require('express');
const router = express.Router();
const {
  createAmmu,
  getAllAmmu,
  getAmmu,
  updateAmmu,
  deleteAmmu,
  getCount,
} = require('../controllers/ammu');

router.route('/create').post(createAmmu);
router.route('/getallammu').get(getAllAmmu);
router.route('/getammu').get(getAmmu);
router.route('/update').post(updateAmmu);
router.route('/delete').delete(deleteAmmu);
router.route('/getcount').get(getCount);

module.exports = router;
