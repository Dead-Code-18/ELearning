const Course = require("../model/course.model");
const User = require("../model/user.model");
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const mongoURI = 'mongodb://localhost/e-learning';
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


exports.insertFileName = (req, res) => {
  Course.update(
    {_id: req.params.courseID},
    {$push: {"contentID": req.file.filename}}
    ).exec(async (error, course) => {
    if (error) return res.status(400).json({ message: error });
    if (course) {
      return res.json({course: course});
    } else {
      return res.status(200).json({ message: "no course" });
    }
  });
};

exports.readFile = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

   else{
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    }
  });
};

exports.deleteFile = (req, res) => {
  gfs.remove({ filename: req.params.filename, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/course/files');
  });
};


exports.getAllFiles = (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    return res.json(files);
  });
};

exports.getSingleFile = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    return res.json(file.aliases);
  });
};

exports.getContent = (req, res) => {
  var courseContents;
  Course.find({_id : req.params.courseID}).exec(async (error, content) => {
    if (error) return res.status(400).json({ message: error });
    if (content) {
      courseContents = content[0];
      return res.json(courseContents.contentID);
    } else {
        return res.status(200).json({ message: "no content" });
    }
  });  
};

exports.getFileName = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    return res.json(file.aliases);
  });
};

exports.searchCourse = (req,res,next) => {
  var q = req.query.q;
  Course.find({
    name : {
      $regex : new RegExp(q)
    }
  }, (err, data) => {
      res.json(data);
  }).limit(10);
};

exports.buyCourse = (req, res) => {
    User.update(
            {
                username: req.body.username
            },
            {
                $push: {
                    "courseIDs": req.params.courseID
                }
            }
        ).exec(async (error, user) => {
            if (error) return res.status(400).json({ message: error });
            if (user) {
                return res.json({User: user});
            } else {
                return res.status(200).json({ message: "no user" });
            }
        }
    );
}