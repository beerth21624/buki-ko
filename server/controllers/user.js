const db = require('../models');

const getAllUser = async (req, res) => {
  try {
    const user = await db.User.findAll();
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json(err);
  }
};
const userApprove = async (req, res) => {
  try {
    const success = await db.User.update(
      {
        validated: true,
      },
      { where: { id: req.body.id } }
    );
    success && res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateRole = async (req, res) => {
  console.log('uprole', req.body);
  try {
    const success = await db.User.update(
      {
        role: req.body.role,
      },
      { where: { id: req.body.id } }
    );
    success && res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteSuccess = await db.User.destroy({
      where: {
        id: req.query.id,
      },
    });
    deleteSuccess && res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUser,
  userApprove,
  deleteUser,
  updateRole,
};
