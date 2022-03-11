const express = require('express');
const router = express.Router();
const { createTodo, deleteTodo, getAllTodo } = require('../controllers/todo');

router.route('/create').post(createTodo);
router.route('/getall').get(getAllTodo);
router.route('/delete').delete(deleteTodo);

module.exports = router;
