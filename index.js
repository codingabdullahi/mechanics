// GETTING ALL MODULES 

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const UserRoutes = require('./routes/UserRoutes');
const MechanicRoutes = require('./routes/MechanicRoutes');
const AdminRoute = require('./routes/admin');
const multer = require('multer')
const dotenv = require('dotenv')
dotenv.config({
  path:'.env'
})


// SETTING VIEWS 
const app = express();
app.set("views","./views")
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
var path = require('path');
app.use(express.static('public'));

// app.use('/uploads', express.static( __dirname + '/uploads/'));

const PORT =  process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, path.join(__dirname, 'public', 'uploads'));// Define the destination folder

  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the file name
  },
});

const public = multer({ storage: storage });


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});
  
app.use(session({
    secret: 'minekey', 
    resave: false,
    saveUninitialized: false,
    store,
}));
  app.get('/:filename',(req,res)=>{
    const filename = req.params.filename;
    const imagePath = path.resolve(__dirname + '/public/uploads');
    console.log(imagePath);
    res.sendFile(imagePath)
})



  app.get('/', (req, res) => {

    res.render('index')

  });
app.use(UserRoutes)
app.use("/technician", MechanicRoutes)
app.use(AdminRoute)


app.get('/faq', (req, res) => {
  res.render('faq');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});