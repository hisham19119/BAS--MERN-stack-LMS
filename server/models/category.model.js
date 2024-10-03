const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    minlength: 3,
    maxlength: 100,
    unique: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
