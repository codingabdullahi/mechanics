const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('../models/Users');
const Mech = require('../models/Mech');
const bcrypt = require('bcrypt');
const Review = require('../models/review');


// signup
const signup = async(req,res)=>{

    const { email,password,phone,location,username} = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        email,
        password: hashedPassword,
        phone,
        location,
        profilePicture: req.file ? req.file.filename : null,
      });
  
      await user.save();
  
      res.redirect('/login');
    } catch(err) {
      console.log(err);
      res.redirect('/signup');
    }

}

const signuppage = async(req,res)=>{
    res.render('signup');
}


// login

const login = async(req,res)=>{
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.redirect('/login');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.redirect('/login');
      }
  
      // Store user data in the session for future use (dashboard, etc.)
      req.session.user = user;
  
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.redirect('/login');
    }
}


const loginpage = async(req,res)=>{
    res.render('login');
}
const dashboard = async(req,res)=>{
  const reviews = await Review.find();
  const user = req.session.user; // Assuming you have user information in the session
  if(!user){
    res.redirect('index')
  }
  const mechanics = await Mech.find().limit(3)
  res.render('dashboard', { user, mechanics,reviews });
}
const allmech = async(req,res)=>{
 // Assuming you have user information in the session
  const mechanics = await Mech.find()
  res.render('all', {  mechanics });
}
const logout = async(req,res)=>{

  req.session.destroy();
  res.redirect('/login');
  
}


// GET USERS
const getUser = async function(req,res){

  try {
    const Mech = await Mech.find();
    res.render('userList', { Mech }); // Render EJS template with users data
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal rubbish  Server Error');
  }
}


const viewprofile = async(req,res)=>{
  try {
    const profile = await Mech.findById(req.params.id).exec();
    res.render('profile', { profile });
  } catch (error) {
    console.error(error);
    res.status(404).send('Profile not found');
  }
  
}

module.exports = {signup,signuppage,login,loginpage,dashboard,logout,getUser,viewprofile,allmech};