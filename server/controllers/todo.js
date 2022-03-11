const db = require('../models');

const createTodo = async (req, res) => {
  try {
    const todo = await db.Todo.create({
      todoDesc: req.body.desc,
      todoTitle: req.body.title,
    });
    res.status(200).json({ success: true, todo });
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllTodo = async (req, res) => {
  try {
    const todo = await db.Todo.findAll();
    res.status(200).json({ success: true, todo });
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteTodo = async (req, res) => {
  try {
    await db.Todo.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createTodo,
  getAllTodo,
  deleteTodo,
};
