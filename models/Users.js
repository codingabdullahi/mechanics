const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true,  },
  password: { type: String, required: true },
  location: { type: String, required: true },
  profilePicture: String,

  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
