const express = require('express');
const  {Router} = require('express')
const router = express.Router();
const controller = require('../controllers/technician');
const multer = require('multer');
const path = require('path');
const Mech = require('../models/Mech');



const storage = multer.diskStorage({
  
  destination:path.normalize(path.join( '..', 'public', 'uploads')),
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

router.post("/signup", upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'certificate', maxCount: 1 }]), controller.techsignup);
router.get("/signup",  controller.techsignppage)

// LOGIN

router.post("/login",  controller.techlogin)
router.get("/login",  controller.techloginpage)

// PROFILE
router.get("/profile/:id",  controller.viewprofile)

// DASHBOARD
router.get("/dashboard",  controller.techdashboard)
// router.post("/update",  controller.techupdate)
// router.get("/update",  controller.updatepage)
router.get('/mechanics/:id', async (req, res) => {
  const mechanic = await Mech.findById(req.params.id);
  res.render('edit_mechanic', { mechanic });
});
router.post("/mechanics/:id",  controller.UpdateMech)
// Handle update
// router.post('/mechanics/:id', async(req, res)=>{
//   try {

//     // const { fullname, email, username, password, phone, location, speciality, facebook, twitter, instagram, about } = req.body;
//     console.log(req.body);
     
//     const updatedMechanic = await Mech.findByIdAndUpdate(
      
//       req.params.id,
//       {MechanicSpeciality:req.body.MechanicSpeciality, MechanicPhone:req.body.MechanicPhone}
//       { new: true }
//     );
    


//     if (!updatedMechanic) {
//       return res.status(404).send("Mechanic not found.");
//     }

//     console.log(updatedMechanic);
//     res.redirect('/technician/dashboard');
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error occurred while updating the mechanic.");
//   }
// });


module.exports = router;