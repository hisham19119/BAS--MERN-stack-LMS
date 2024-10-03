const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 500,
  },
  price: {
    type: Number,
    min: 0,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  // chapter: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Chapter",
  //   },
  // ],
  imageCover: {
    type: String,
  },
  attachment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Course", courseSchema);
