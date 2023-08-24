const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('../models/Users');
const Mech = require('../models/Mech');
const bcrypt = require('bcrypt');

// SIGNUP

const techsignup = async(req,res)=>{

  const { firstname,lastname,email,username,phone,password,location,speciality,facebook,twitter,instagram,about,} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const mech = new Mech({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      location,
      username,
      speciality,
      facebook,
      twitter,
      instagram,
      profilePicture: req.files.profilePicture && req.files.profilePicture[0] ? req.files.profilePicture[0].filename : null,
      certificate: req.files.certificate && req.files.certificate[0] ? req.files.certificate[0].filename : null,

      about

    });


    await mech.save();


    res.redirect('/technician/login');

  } catch(err) {
    console.error(err);

  }
}
const techsignppage = async(req,res)=>{
  res.render('techniciansignup');
}
const techloginpage = async(req,res)=>{
  res.render('technicianlogin');
}
const techdashboard = async(req,res)=>{
  const mechanics = req.session.user; // Assuming you have user information in the session
  const mechanicss = await Mech.find().populate('viewedBy');
  res.render('techniciandashboard', {  mechanics,mechanicss });
}
const updatepage = async(req,res)=>{
  
  try {
    const profile = await Mech.findById(req.params.id).exec();

  
    res.render('myaccount',  { profile: profile} );
  } catch (error) {
    console.error(error);
    res.status(404).send('Profile not found');
  }
}
const techlogin = async(req,res)=>{
    const { email, password } = req.body;

  try {
    const user = await Mech.findOne({ email });
    if (!user) {
      return res.redirect('/login');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.redirect('/login');
    }

    // Store user data in the session for future use (dashboard, etc.)
    req.session.user = user;

    res.redirect('/technician/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/technician/login');
  }
}
const viewprofile = async(req,res)=>{
  try {
    const profile = await Mech.findById(req.params.id).exec();

  
    res.render('profile', { profile, });
  } catch (error) {
    console.error(error);
    res.status(404).send('Profile not found');
  }
  
}
const UpdateMech = async(req,res)=>{
  const id = req.params.id
  console.log(req.body);
  const UpdateMech = await Mech.findByIdAndUpdate(id, {fullname:req.body.fullname} )

  res.send(UpdateMech)


}

module.exports = {updatepage,techsignup,techsignppage,techlogin,techloginpage,techdashboard,viewprofile,UpdateMech};