const Course = require("../model/course.model");
const shortid = require("shortid");

exports.createCourse = (req, res) => {

    const{
        name,price,description,requirements,category
    } = req.body;

    const course = new Course({
        name,
        price,
        description,
        requirements,
        coursePicture,
        category,  
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