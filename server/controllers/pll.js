const db = require('../models');

const createPll = async (req, res) => {
  const { pllName, pllNumber, pllQty, pllGun, pllNote } = req.body;
  try {
    const pll = await db.Pll.create({
      pllName,
      pllNumber,
      pllQty,
      pllGun,
      pllNote,
    });
    res.status(201).json(pll);
  } catch (err) {
    res.status(500).json('');
  }
};
const getAllPll = async (req, res) => {
  try {
    let limit = 8;
    let offset = 0 + (req.query.page - 1) * limit;
    const search = req.query.search;
    if (search) {
      const data = await db.Pll.findAndCountAll({
        where: { PllNumber: search },
        offset: offset,
        limit: limit,
      });

      const outputCount = Math.ceil(data.count / limit);
      res.status(200).json({ sucess: true, pllData: data, count: outputCount });
    } else {
      const data = await db.Pll.findAndCountAll({
        offset: offset,
        limit: limit,
      });
      const outputCount = Math.ceil(data.count / limit);
      res.status(200).json({ sucess: true, pllData: data, count: outputCount });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getPll = async (req, res) => {
  const { id } = req.query;
  try {
    const resault = await db.Pll.findOne({ where: { pllNumber: id } });
    res.status(200).json({ sucess: true, pllData: resault });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePll = async (req, res) => {
  const { pllName, pllNumber, pllQty, pllGun, pllNote } = req.body;
  try {
    const pll = await db.Pll.update(
      {
        pllName,
        pllNumber,
        pllQty,
        pllGun,
        pllNote,
      },
      { where: { pllNumber } }
    );
    res.status(201).json(pll);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deletePll = async (req, res) => {
  try {
    const deleteSuccess = await db.Pll.destroy({
      where: {
        pllNumber: req.query.pllNumber,
      },
    });
    deleteSuccess && res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createPll,
  getAllPll,
  getPll,
  updatePll,
  deletePll,
};
