const express = require('express');
const router = express.Router();
const {
  createPll,
  getAllPll,
  getPll,
  deletePll,
  updatePll,
} = require('../controllers/pll');

router.route('/create').post(createPll);
router.route('/getallpll').get(getAllPll);
router.route('/getpll').get(getPll);
router.route('/update').post(updatePll);
router.route('/delete').delete(deletePll);

module.exports = router;
