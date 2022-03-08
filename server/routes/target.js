const express = require('express');
const router = express.Router();
const {
  createTarget,
  getAllTarget,
  getTarget,
  updateTarget,
  deleteTarget,
} = require('../controllers/target');

router.route('/create').post(createTarget);
router.route('/getalltarget').get(getAllTarget);
router.route('/gettarget').get(getTarget);
router.route('/update').post(updateTarget);
router.route('/delete').delete(deleteTarget);

module.exports = router;
