// GETTING ALL MODULES 

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const UserRoutes = require('./routes/UserRoutes');
const MechanicRoutes = require('./routes/MechanicRoutes');
const userschema = require('./models/Users')
const multer = require('multer')
const axios = require('axios');
const ejs = require('ejs')
const dotenv = require('dotenv')
dotenv.config({
  path:'.env'
})


// SETTING VIEWS 
const app = express();
app.set("views","./views")
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
const PORT =  process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Define the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the file name
  },
});

const upload = multer({ storage: storage });


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});
  
app.use(session({
    secret: 'minekey', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    store,
}));

// ADMIN

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
    const user = req.session.user;
    res.render('dasboardadmin',{ user,userschema })

  });
app.use(UserRoutes)
app.use("/technician", MechanicRoutes)




app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});