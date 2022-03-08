const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const { name, rank, username, password } = req.body;
  console.log(name);

  try {
    const validateUser = await db.User.findOne({ where: { username } });
    validateUser && res.status(500).json('You have an account , please Login!');
    const salt = await bcrypt.genSalt(10);
    const genPassword = await bcrypt.hash(password, salt);
    const user = await db.User.create({
      name,
      rank,
      username,
      password: genPassword,
    });
    user && res.status(201).json({ success: true, message: 'please login' });
  } catch (err) {
    res.status(500).json({ success: false, errMsg: err.message });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username) {
      res.status(400).json('please enter username');
    }
    if (!password) {
      res.status(400).json('please enter password');
    }

    const user = await db.User.findOne({ where: { username } });
    !user && res.status(500).json('Invalid credentials , please sign up');
    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    !isMatch && res.status(500).json('invalid password');
    console.log('sss', process.env.JWT_SECRET);
    const token = await jwt.sign(
      { username: user.username, password: user.password },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    console.log(token);
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createUser,
  userLogin,
};
