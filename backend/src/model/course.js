const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    instructors: [
        {
            name: String,
            profileLink: String,
            rating: Number,
        }
    ],
    price: {
        type: Number,
        required: true
    },
    offer: {
        type: Number
    },
    enrolled:{
        type: Number
    },
    description: {
        type: String,
        required: true,
        trim: true,
        max: 500
    },
    requirements: {
        type: String,
        required: true,
        trim: true,
        max: 500
    },
    content: [
        {
            type: String,
        }
    ],
    coursePicture: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userID: {
                type:mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            score: Number,
            comment: String
        }
    ],
    updatedAt: Date,
    category:{
        type: mongoose.Schema.Types.ObjectId, ref: "Category",
        required: true
    }
},{
        timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);