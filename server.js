const express = require('express')
const app = express();
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const path = require('path');
const { connect } = require('http2');
const connectDB = require('./db/connectDB');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nocache = require('nocache');


app.use(session({
    secret: 'your-secret-key', // use strong key in production
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use(nocache());


//view engine setup
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','hbs');
//static assets
app.use(express.static('public'))


app.use(express.urlencoded({extended:true}));
app.use(express.json());

//view engine setup
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','hbs');
//static assets
app.use(express.static('public'))

app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

app.get('/',(re,res)=>{
    res.send("im directory")
})



connectDB();


app.listen(3000,() =>{
    console.log("started");
})