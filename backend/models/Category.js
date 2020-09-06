const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  catname: {
    type: String,
    required: true,
    unique: true,
  },
  file:{
    type: String,
    default: "/uploads/no-photo.jpg",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
