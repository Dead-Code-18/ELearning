const Course = require("../model/Course");
const shortid = require("shortid");

exports.createCourse = (req, res) => {

    const{
        name,price,description,requirements,category
    } = req.body;

    let coursePicture = [];
    if(req.files.length > 0){
        coursePicture = req.files.map(file =>{
            return {img: file.filename}
        });
    }

    const course = new Course({
        name: name,
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