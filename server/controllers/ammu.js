const db = require('../models');

const createAmmu = async (req, res) => {
  const { ammuName, ammuNumber, ammuLot, ammuQty, ammuNote, ammuBill } =
    req.body;
  try {
    const ammu = await db.Ammu.create({
      ammuName,
      ammuNumber,
      ammuLot,
      ammuQty,
      ammuNote,
      ammuBill,
    });
    res.status(201).json(ammu);
  } catch (err) {
    res.status(500).json('');
  }
};
const updateAmmu = async (req, res) => {
  const { ammuName, ammuLot, ammuQty, ammuNote, ammuBill } = req.body;
  try {
    const ammu = await db.Ammu.update(
      {
        ammuName,
        ammuLot,
        ammuQty,
        ammuNote,
        ammuBill,
      },
      { where: { ammuLot } }
    );
    res.status(201).json(ammu);
  } catch (err) {
    res.status(500).json('');
  }
};
const deleteAmmu = async (req, res) => {
  try {
    const deleteSuccess = await db.Ammu.destroy({
      where: {
        ammuLot: req.query.ammuLot,
      },
    });
    deleteSuccess && res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllAmmu = async (req, res) => {
  try {
    let limit = 2;
    let offset = 0 + (req.query.page - 1) * limit;
    const search = req.query.search;
    if (search) {
      const data = await db.Ammu.findAndCountAll({
        where: { ammuLot: search },
        offset: offset,
        limit: limit,
      });

      const outputCount = Math.ceil(data.count / limit);
      console.log('bbbb', data);
      res
        .status(200)
        .json({ sucess: true, ammuData: data, count: outputCount });
    } else {
      const data = await db.Ammu.findAndCountAll({
        offset: offset,
        limit: limit,
      });
      const outputCount = Math.ceil(data.count / limit);
      console.log('bbbb', data);
      res
        .status(200)
        .json({ sucess: true, ammuData: data, count: outputCount });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAmmu = async (req, res) => {
  const { id } = req.query;
  try {
    const resault = await db.Ammu.findOne({ where: { ammuLot: id } });
    if (resault) res.status(200).json({ sucess: true, ammuData: resault });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createAmmu,
  updateAmmu,
  deleteAmmu,
  getAllAmmu,
  getAmmu,
};
