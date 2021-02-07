const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    offer: {
      type: Number,
    },
    enrolled: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      max: 500,
    },
    requirements: {
      type: String,
      required: true,
      trim: true,
      max: 500,
    },
    contentID: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
