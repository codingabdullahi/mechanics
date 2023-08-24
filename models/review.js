const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
picture:String,
  comment: String,
});

module.exports = mongoose.model('Review', reviewSchema);
