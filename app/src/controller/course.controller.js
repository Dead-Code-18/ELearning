const Course = require("../model/course.model");
const Category = require("../model/category.model");

exports.createCourse = (req, res) => {

    const{
        name,price,description,requirements, category
    } = req.body;

    const course = new Course({
        name,
        price,
        description,
        requirements,
        category,
    });

    course.save((error, data) => {
        if (error) {
            return res.status(400).json({ error});
        }

        if (data) {
            Category.update(
                {name: course.category},
                {$push: {"courseIDs": course._id}}
                ).exec(async (error, category) => {
                if (error) return res.status(400).json({ message: error });
                if (category) {
                  return res.json({category: category, course: course});
                } else {
                  return res.status(200).json({ message: "not a category" });
                }
            });
            //return res.status(201).json(course);    
        }
    }); 
};

exports.getCourse = (req, res) => {
    Course.find({_id : req.params._id}).exec(async (error, course) => {
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
  const {name, price, description, requirements} = req.body;
  Course.findOneAndUpdate(
    { _id: req.params._id },
    {
        name : name,
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

