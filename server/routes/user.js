const express = require('express');
const router = express.Router();

const {
  getAllUser,
  userApprove,
  deleteUser,
  updateRole,
} = require('../controllers/user');

router.route('/getalluser').get(getAllUser);
router.route('/userapprove').patch(userApprove);
router.route('/deleteuser').delete(deleteUser);
router.route('/updaterole').patch(updateRole);

module.exports = router;
