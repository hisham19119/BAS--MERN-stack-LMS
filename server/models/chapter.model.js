const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: {
    type: [String],
    required: true,
    // minlength: 3,
    // maxlength: 100,
    unique: true,
  },
  video: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
    minlength: 10,
    maxlength: 1000,
  },
  access: {
    type: Boolean,
    // default: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

module.exports = mongoose.model("Chapter", chapterSchema);
