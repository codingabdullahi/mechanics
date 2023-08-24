const express = require('express')
const router = express.Router();
const  {Router} = require('express')
const app = express()
const User = require('../models/Users');
const Mech = require('../models/Mech');




const users = [
    { username: 'admin', password: 'admin' },
];

app.get('/admin', (req, res) => {
    res.render('admin');
});
app.post('/adminlogin', (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      req.session.user = user;
      res.redirect('/admindashboard');
    } else {
      res.send('Invalid username or password');
    }
});

app.get('/admindashboard', (req, res) => {
    const userCount = User.countDocuments();
    console.log(userCount);
    const user = req.session.user;
    res.render('dasboardadmin',{ user,userschema,userCount })

});

module.exports = router;