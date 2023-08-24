const mongoose = require('mongoose');

const mechSchema = new mongoose.Schema({
  firstname:{type:String,required:true},
  lastname:{type:String,required:true},
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true,  },
  phone: { type: String, required: true,  },
  password: { type: String, required: true },
  location: { type: String, required: true },
  speciality:{type:String,required:true},
  facebook:{type:String,required:true},
  twitter:{type:String,required:true},
  instagram:{type:String,required:true},
  about:{type:String,required:true},
  profilePicture: String,
  certificate: { type: String, required: true },
  viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
});

const Mech = mongoose.model('Mech', mechSchema);

module.exports = Mech;
