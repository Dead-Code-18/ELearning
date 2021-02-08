const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const Course = require("../model/course.model");
const { insertFileName, readFile, deleteFile, getAllFiles, getSingleFile, getContent, getFileName, searchCourse, buyCourse} = require("../controller/content.controller");

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
          aliases: file.originalname,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

router.get('/files', getAllFiles);
router.get('/:courseID/files', getContent);
router.post('/:courseID/files', upload.single('file'), insertFileName);
router.get('/files/:filename', getSingleFile);
router.get('/file/:filename', getFileName);
router.get('/files/read/:filename', readFile);
router.delete('/files/:filename', deleteFile);

//these are here as they don't work in couse.js for unknown reasons
router.get('/search', searchCourse);
router.post("/:courseID/buy", buyCourse);

module.exports = router;