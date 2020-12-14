const Category = require("../model/catagory");
const slugify = require("slugify");

function createCategoryInDivision(categories, parentID = null) {
    var categoryList = [];
    var category;
    if (parentID == null) {
        category = categories.filter(cat => cat.parentID == undefined);
    } else {
        category = categories.filter(cat => cat.parentID == parentID);
    }

    for (let cate of category) {
        categoryList.push({
            _id : cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategoryInDivision(categories,cate._id)
        });
    }

    return categoryList;
}

exports.createCategory = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if (req.body.parentID) {
        categoryObj.parentID = req.body.parentID;
    }

    const cat = new Category(categoryObj);
    cat.save((error, data) => {
        if (error) {
            return res.status(400).json({ error });
        }
        if (data) {
            return res.status(201).json({ data });
        }
    });

};

exports.getCategory = (req, res) => {

    Category.find({})
        .exec((error, categories) => {

            if (error) return res.status(400).json({ error });

            if (categories) {
                const categoryList = createCategoryInDivision(categories);
                res.status(200).json({ categoryList });
            }

        });

};

