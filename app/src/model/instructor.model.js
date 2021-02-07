const mongoose = require("mongoose");

var instructorSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    experience: {
      type: String,
      required: true,
    },
    additional_details: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instructor", instructorSchema);
