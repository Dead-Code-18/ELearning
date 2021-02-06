const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { insertFileName, readFile, deleteFile, getAllFiles, getSingleFile} = require("../controller/content.controller");

const router = express.Router();

router.use(methodOverride('_method'));
router.use(bodyParser.json()); 

const storage = new GridFsStorage({
  url: 'mongodb://localhost/e-learning',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = req.body.userID + req.body.authorID + file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), insertFileName);
router.get('/files', getAllFiles);
router.get('/files/:filename', getSingleFile);
router.get('/read/:filename', readFile);
router.delete('/files/:id', deleteFile);


module.exports = router;