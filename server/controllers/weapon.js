const db = require('../models');

const createWeapon = async (req, res) => {
  const { gunName, gunStatus, gunBill, gunNote, gunNumber, gunStore } =
    req.body;

  const { filename } = req.file;
  console.log('dreewawf', req.body);
  console.log('dreewawfile', req.file);
  try {
    const weapon = await db.Weapon.create({
      gunName,
      gunStatus,
      gunNumber,
      gunStore,
      gunBill,
      gunNote,
      gunImage: filename,
    });
    console.log(req.file);
    res.status(201).json(weapon);
  } catch (err) {
    res.status(500).json('');
  }
};

const getAllWeapon = async (req, res) => {
  try {
    let limit = 8;
    let offset = 0 + (req.query.page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;
    console.log('brefasefasdfadsfdsfsdf', req.query);
    if (search) {
      const data = await db.Weapon.findAndCountAll({
        where: { gunNumber: search },
        offset: offset,
        limit: limit,
      });
      const outputCount = Math.ceil(data.count / limit);
      res
        .status(200)
        .json({ sucess: true, weaponData: data, count: outputCount });
    } else if (status) {
      const data = await db.Weapon.findAndCountAll({
        where: { gunStatus: status },
        offset: offset,
        limit: limit,
      });
      const outputCount = Math.ceil(data.count / limit);
      res
        .status(200)
        .json({ sucess: true, weaponData: data, count: outputCount });
    } else {
      console.log('beer');
      const data = await db.Weapon.findAndCountAll({
        offset: offset,
        limit: limit,
      });
      const outputCount = Math.ceil(data.count / limit);
      res
        .status(200)
        .json({ sucess: true, weaponData: data, count: outputCount });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getWeaponBill = async (req, res) => {
  const { id } = req.query;
  try {
    const resault = await db.Weapon.findOne({ where: { gunNumber: id } });
    res.status(200).json({ sucess: true, weaponData: resault });
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateWeapon = async (req, res) => {
  const { gunName, gunStatus, gunBill, gunNote, gunNumber, gunStore } =
    req.body;
  try {
    if (req.file) {
      const { filename } = req.file;
      console.log('beerrrr11111');
      const resault = await db.Weapon.update(
        {
          gunName,
          gunStatus,
          gunNumber,
          gunStore,
          gunBill,
          gunNote,
          gunImage: filename,
          BillId: '',
        },
        { where: { gunNumber } }
      );
      if (!resault) {
        return res.status(200).send({
          status: 404,
          message: 'No data found',
        });
      }
      res.status(200).json({ sucess: true, weaponData: resault });
    } else {
      console.log('body', req.body);
      const resault = await db.Weapon.update(
        {
          gunName: req.body.gunName,
          gunStatus: req.body.gunStatus,
          gunNumber: req.body.gunNumber,
          gunStore: req.body.gunStore,
          gunBill: req.body.gunBill,
          gunNote: req.body.gunNote,
          gunImage: req.body.gunImage,
        },
        { where: { gunNumber: req.body.gunNumber } }
      );
      console.log('resault', resault);
      if (!resault) {
        return res.status(200).send({
          status: 404,
          message: 'No data found',
        });
      }
      if (resault) res.status(200).json({ sucess: true, weaponData: resault });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteWeapon = async (req, res) => {
  try {
    const deleteSuccess = await db.Weapon.destroy({
      where: {
        gunNumber: req.query.gunNumber,
      },
    });
    console.log('suuuuussccceesss');
    console.log(deleteSuccess);
    deleteSuccess && res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};
const getCount = async (req, res) => {
  try {
    const data = await db.Weapon.findAll();
    const readyGun = data.filter((gun) => gun.gunStatus == 'พร้อมใช้งาน');
    const fixGun = data.filter((gun) => gun.gunStatus == 'ส่งซ่อม');
    const outGun = data.filter((gun) => gun.gunStatus == 'รอส่งคืน');
    const billGun = data.filter((gun) => gun.gunStatus == 'เบิก-จ่าย');

    res.status(200).json({
      all: data.length,
      ready: readyGun.length,
      fix: fixGun.length,
      out: outGun.length,
      bill: billGun.length,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createWeapon,
  getAllWeapon,
  getWeaponBill,
  updateWeapon,
  deleteWeapon,
  getCount,
};
