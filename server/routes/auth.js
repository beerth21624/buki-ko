const express = require('express');
const router = express.Router();
const { createUser, userLogin } = require('../controllers/auth');

router.route('/register').post(createUser);
router.route('/login').post(userLogin);

module.exports = router;
