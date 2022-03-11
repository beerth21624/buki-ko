const db = require('../models');

const createTarget = async (req, res) => {
  const { targetName, targetBill, targetQty, targetNote } = req.body;
  try {
    const target = await db.Target.create({
      targetName,
      targetBill,
      targetQty,
      targetNote,
    });
    res.status(201).json(target);
  } catch (err) {
    res.status(500).json('');
  }
};

const getAllTarget = async (req, res) => {
  try {
    let limit = 8;
    let offset = 0 + (req.query.page - 1) * limit;
    const search = req.query.search;
    if (search) {
      const data = await db.Target.findAndCountAll({
        where: { targetBill: search },
        offset: offset,
        limit: limit,
      });

      const outputCount = Math.ceil(data.count / limit);
      res
        .status(200)
        .json({ sucess: true, targetData: data, count: outputCount });
    } else {
      const data = await db.Target.findAndCountAll({
        offset: offset,
        limit: limit,
      });
      const outputCount = Math.ceil(data.count / limit);
      res
        .status(200)
        .json({ sucess: true, targetData: data, count: outputCount });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getTarget = async (req, res) => {
  const { id } = req.query;
  try {
    const resault = await db.Target.findOne({ where: { targetBill: id } });
    res.status(200).json({ sucess: true, targetData: resault });
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateTarget = async (req, res) => {
  const { targetName, targetBill, targetQty, targetNote } = req.body;
  try {
    const target = await db.Target.update(
      {
        targetName,
        targetBill,
        targetQty,
        targetNote,
      },
      { where: { targetBill } }
    );
    res.status(201).json(target);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteTarget = async (req, res) => {
  try {
    const deleteSuccess = await db.Target.destroy({
      where: {
        targetBill: req.query.targetBill,
      },
    });
    deleteSuccess && res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createTarget,
  getAllTarget,
  getTarget,
  updateTarget,
  deleteTarget,
};
