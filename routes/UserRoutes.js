const  {Router} = require('express')
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user')

const multer = require('multer');
const path = require('path');
const Mech = require('../models/Mech');
const Review = require('../models/review');


const storage = multer.diskStorage({
  destination:path.normalize(path.join(__dirname, '..', 'public', 'uploads')),
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit (adjust as needed)
  }
 });

// SIGNUP

router.post("/signup", upload.single('profilePicture'), controller.signup);
router.get("/signup",  controller.signuppage)

// LOGIN

router.post("/login",  controller.login)
router.get("/login",  controller.loginpage)

// DASHBOARD
router.get("/dashboard",  controller.dashboard,controller.getUser)

// // view mechanic
// router.get("/mechanicprofile",  controller.profilepage,controller.getSper)
router.get("/profile:/id",  controller.viewprofile)

// VIEW ALL MECHANIC 
router.get("/mechs",  controller.allmech)


router.get('/review', async (req, res) => {
  try {
      const reviews = await Review.find();
      res.render('review', { reviews });
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal rubish Server Error');
  }
});
router.post('/submit-review', upload.single('picture'),async (req, res) => {
  try {
    const { name,  comment } = req.body;
    const picture = req.file.filename;
    await Review.create({ name, picture, comment });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('al Server Error');
  }
});
// LOGOUT
router.get("/logout",  controller.logout)

module.exports = router;