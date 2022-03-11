const db = require('../models');
const path = require('path');

const createDoc = async (req, res) => {
  const { filename } = req.file;
  console.log('bdsfnjdsnfjkdnskfnjdksfnsj');
  console.log(req.file);
  try {
    const doc = await db.Doc.create({
      docName: req.body.name,
      docFile: filename,
    });
    console.log(req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllDoc = async (req, res) => {
  try {
    const doc = await db.Doc.findAll();
    res.status(200).json({ success: true, doc });
  } catch (err) {
    res.status(500).json(err);
  }
};
const downLoadDoc = async (req, res) => {
  console.log(req.query.id);
  console.log(path.resolve('Filestorage'));
  //   res.download(
  //     '/Users/beerth21624/Documents/web development/working project/armory/server/FileStroage/crma-uploadFile-1646908579627-970721744.png'
  //   );
  res.download(path.resolve('FileStorage', req.query.id));
};

const deleteDoc = async (req, res) => {
  try {
    await db.Doc.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.status(200).json('success');
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createDoc,
  getAllDoc,
  downLoadDoc,
  deleteDoc,
};
