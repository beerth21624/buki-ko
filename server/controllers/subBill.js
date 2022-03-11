const db = require('../models');

const createSubBill = async (req, res) => {
  const {
    billName,
    recipName,
    payerName,
    agencyName,
    billQty,
    billType,
    listName,
    amount,
    typeId,
  } = req.body;
  try {
    if (billType == 'ammu') {
      await db.Ammu.update(
        {
          ammuQty: amount,
        },
        { where: { ammuLot: typeId } }
      );
    } else if (billType == 'pll') {
      await db.Pll.update(
        {
          pllQty: amount,
        },
        { where: { pllNumber: typeId } }
      );
    } else if (billType == 'target') {
      await db.Target.update(
        {
          targetQty: amount,
        },
        { where: { targetBill: typeId } }
      );
    } else {
      console.error('error');
    }

    const bill = await db.SubBill.create({
      billName,
      recipName,
      payerName,
      agencyName,
      billQty,
      billType,
      listName,
    });
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json('');
  }
};
const getAllSubBill = async (req, res) => {
  try {
    let limit = 6;
    let offset = 0 + (req.query.page - 1) * limit;
    const type = req.query.type;
    console.log('ttyyppee', type);
    if (type == '') {
      console.log('ttyyppee11111');
      const data = await db.SubBill.findAndCountAll({
        offset: offset,
        limit: limit,
      });
      const outputCount = Math.ceil(data.count / limit);
      res
        .status(200)
        .json({ sucess: true, subbillData: data, count: outputCount });
    } else {
      console.log('ttyyppee22222');
      const data = await db.SubBill.findAndCountAll({
        where: { billType: type },
        offset: offset,
        limit: limit,
      });

      const outputCount = Math.ceil(data.count / limit);
      res
        .status(200)
        .json({ sucess: true, subbillData: data, count: outputCount });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getSubBill = async (req, res) => {
  const { id } = req.query;
  try {
    const resault = await db.bill.findOne({ where: { billNumber: id } });
    res.status(200).json({ sucess: true, billData: resault });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateSubBill = async (req, res) => {
  const { billName, billNumber, billQty, billGun, billNote } = req.body;
  try {
    const bill = await db.bill.update(
      {
        billName,
        billNumber,
        billQty,
        billGun,
        billNote,
      },
      { where: { billNumber } }
    );
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteSubBill = async (req, res) => {
  try {
    const deleteSuccess = await db.bill.destroy({
      where: {
        billNumber: req.query.billNumber,
      },
    });
    deleteSuccess && res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createSubBill,
  getAllSubBill,
};
