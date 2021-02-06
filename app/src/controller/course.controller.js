const Course = require("../model/course.model");

exports.createCourse = (req, res) => {

    const{
        name,price,description,requirements
    } = req.body;

    const course = new Course({
        name,
        price,
        description,
        requirements,
    });

    course.save((error, data) => {
        if (error) {
            return res.status(400).json({ error});
        }

        if (data) {
           return res.status(201).json({course});
        }
    });
};

exports.getCourse = (req, res) => {
    Course.find({name : req.params.courseName}).exec(async (error, course) => {
        if (error) return res.status(400).json({ message: error });
        if (course) {
            return res.json(course);
        } else {
            return res.status(200).json({ message: "no course" });
        }
    });
};

exports.getAllCourse = (req, res) => {
    Course.find().exec(async (error, course) => {
        if (error) return res.status(400).json({ message: error });
        if (course) {
            return res.json(course);
        } else {
            return res.status(200).json({ message: "no course" });
        }
    });
};

exports.updateCourse = (req, res) => {
  const {price, description, requirements} = req.body;
  Course.findOneAndUpdate(
    { name: req.params.courseName },
    {
        price : price,
        description : description,
        requirements : requirements
    },
    {
      new: true,
    }
  ).exec(async (error, course) => {
    if (error) return res.status(400).json({ message: error });
    if (course) {
      course
        .save()
        .then((course) => res.json(course))
        .catch((err) => console.log(err));
    } else {
      return res.status(200).json({ message: "no course" });
    }
  });
};
