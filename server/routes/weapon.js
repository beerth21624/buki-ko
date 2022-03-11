const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createWeapon,
  getAllWeapon,
  getWeaponBill,
  updateWeapon,
  deleteWeapon,
  getCount,
} = require('../controllers/weapon');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      '/Users/beerth21624/Documents/web development/working project/armory/server/public'
    );
  },
  filename: function (req, file, cb) {
    console.log('name', file);
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `armory-${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});
const upload = multer({ storage: storage });

router.post('/create', upload.single('gunImage'), createWeapon);
router.post('/update', upload.single('gunImage'), updateWeapon);
router.route('/getallweapon').get(getAllWeapon);
router.route('/getweapon').get(getWeaponBill);
router.route('/delete').delete(deleteWeapon);
router.route('/getcount').get(getCount);


module.exports = router;
