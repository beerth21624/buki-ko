const express = require('express');
const router = express.Router();
const {
  createDoc,
  downLoadDoc,
  getAllDoc,
  deleteDoc,
} = require('../controllers/doc');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      '/Users/beerth21624/Documents/web development/working project/armory/server/FileStorage'
    );
  },
  filename: function (req, file, cb) {
    console.log('name', file);
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `crma-${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('uploadFile'), createDoc);
router.route('/getall').get(getAllDoc);
router.route('/getDoc').get(downLoadDoc);
router.route('/delete').delete(deleteDoc);

module.exports = router;
