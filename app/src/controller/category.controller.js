const Category = require("../model/category.model");

//just to create category,, for future use
exports.createCategory = (req, res) => {
    const{
        name
    } = req.body;

    const category = new Category({
        name,
    });

    category.save((error, data) => {
        if (error) {
            return res.status(400).json({ error});
        }

        if (data) {
            return res.status(201).json(category);    
        }
    }); 
};


//this one is integrated with createCourse api in courses.controller, 
//pls check there, this one is not for use

exports.insertCoursesIntoCategory = (req, res) => {
	Category.update(
    {name: req.body.category},
    {$push: {"courseIDs": req.file.courseID}}
    ).exec(async (error, category) => {
    if (error) return res.status(400).json({ message: error });
    if (category) {
      return res.json({category: category});
    } else {
      return res.status(200).json({ message: "not a category" });
    }
  });
}
///


//get _id of courses of a single category
exports.getCourses = (req, res) => {
  var categoryCourses;
  Category.find({name : req.params.categoryName}).exec(async (error, category) => {
    if (error) return res.status(400).json({ message: error });
    if (category) {
      categoryCourses = category[0];
      return res.json(categoryCourses.courseIDs);
    } else {
        return res.status(200).json({ message: "not a category" });
    }
  });  
};