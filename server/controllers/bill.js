const db = require('../models');
const { Op } = require('sequelize');

const createBill = async (req, res) => {
  const {
    billNumber,
    agencyName,
    nameApprover,
    nameRecipient,
    listBillId,
    billNote,
    cartList,
  } = req.body;
  console.log(req.body);
  try {
    db.Bill.create({
      billNumber,
      agencyName,
      nameApprover,
      nameRecipient,
      listBillId,
      billNote,
    })
      .then((resault) =>
        db.Weapon.update(
          {
            gunStatus: 'เบิก-จ่าย',
            BillId: resault.dataValues.billNumber,
          },
          {
            where: {
              id: {
                [Op.in]: cartList.map((cart) => cart.id),
              },
            },
          }
        )
      )
      .then((success) => res.status(201).json(success))
      .catch(function (err) {
        console.log('Error:' + String(err));
      });
  } catch (err) {
    res.status(500).json('');
  }
};

const getAllBill = async (req, res) => {
  try {
    let limit = 6;
    let offset = 0 + (req.query.page - 1) * limit;
    const data = await db.Bill.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    console.log('dataaaaa', data);
    const outputCount = Math.ceil(data.count / limit);
    res.status(200).json({ sucess: true, billData: data, count: outputCount });
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllBillWeapon = async (req, res) => {
  try {
    const data = await db.Weapon.findAll({
      where: { BillId: req.query.billId },
    });
    console.log('dataaaaa', data);
    res.status(200).json({ sucess: true, data });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createBill,
  getAllBill,
  getAllBillWeapon,
};
