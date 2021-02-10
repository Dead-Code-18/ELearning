const Course = require("../model/course.model");
const Instructor = require("../model/instructor.model");

const User = require("../model/user.model");

exports.createCourse = (req, res) => {

  const { name, price, description, requirements, instructor } = req.body;
  var owner={};

  User.findById(instructor).exec(async (error, user) => {
    if(user){
      const course = new Course({
        name,
        price,
        description,
        requirements,
        instructor,
        instructorName: user.username,
      });
      course.save((error, data) => {
        if (error) {
          return res.status(400).json({ error });
        }

        if (data) {
          Instructor.findOneAndUpdate(
            { _id: instructor },
            {
              $push: { createdCourses: data._id },
            },
            {
              new: true,
            }
          ).exec(async (error, instructor) => {
            if (error) return res.status(400).json({ message: error });
            if (instructor) {
              instructor
                .save()
                .then((instructor) => res.json({ instructor, data }))
                .catch((err) => console.log(err));
            } else {
              return res.status(200).json({ message: "no instructor" });
            }
          });
        }
      });
    }
  })

};

exports.getCourse = (req, res) => {
  Course.find({ name: req.params.courseName }).exec(async (error, course) => {
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

exports.getCourseForUser = (req, res) => {
  const id = req.query.userID;
  let courseIDList = [];
  User.findById(id).exec(async (error, user) => {
    if (user) {
      courseIDList = user.ownedCourses;
      let courseList = await Course.find({_id : {$in: courseIDList}});
      return res.json(courseList);
    } else {
      return res.json({ error: "user not found" });
    }
  });
};

exports.getCourseIDForUser = (req, res) => {
  const id = req.query.userID;
  let courseIDList = [];
  User.findById(id).exec(async (error, user) => {
    if (user) {
      courseIDList = user.ownedCourses;
      return res.json(courseIDList);
    } else {
      return res.json({ error: "user not found" });
    }
  });
};

exports.getCourseForInstructor = (req,res) => {
  const id = req.query.instructorID;
  let courseIDList = [];
  Instructor.findById(id).exec(async (error, instructor) => {
    if (instructor) {
      courseIDList = instructor.createdCourses;
      let courseList = await Course.find({_id : {$in: courseIDList}});
      return res.json(courseList);
    } else {
      return res.json({ error: "instructor not found" });
    }
  });
};



exports.updateCourse = (req, res) => {
  const { price, description, requirements } = req.body;
  Course.findOneAndUpdate(
    { _id: req.query.courseID },
    {
      price: price,
      description: description,
      requirements: requirements,
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

exports.getCourseOwner = (req,res) => {
  const {courseID} = req.query;
  Course.findById(courseID).exec(async (error, course) => {
    if(course){
      return res.json(course.instructor);
    }else{
      return res.json({message: "course not found"})
    }
  });
}

exports.searchCourse = (req, res) => {
  const {q} = req.query;
  Course.find(
    {
      name: {
        $regex: new RegExp(q),
      },
    },
    (err, data) => {
      console.log(data);
      res.json(data);
    }
  ).limit(10);
};

exports.buyCourse = (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.query.userID,
    },
    {
      $push: {
        ownedCourses: req.query.courseID,
      },
    }
  ).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: error });
    if (user) {
      return res.json({ User: user });
    } else {
      return res.status(200).json({ message: "no user" });
    }
  });
};
