const express = require('express')  //function 

const app = express() //module
app.use(express.urlencoded({extended:false}))    //body parser
const adminRouter = require('./routers/admin');
const frontendRouter = require('./routers/frontend');
const mongoose = require('mongoose'); // module
const session = require('express-session'); //session module
const multer = require('multer') // image module



mongoose.connect('mongodb://127.0.0.1:27017/Expressproject-01', ()=>{
    console.log('database is conneted');

})




app.use(session({
    secret:'amit',
    saveUninitialized:false,
    resave:false
}))
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(frontendRouter);
app.use('/admin',adminRouter);
app.listen(4000 , ()=>{
    console.log('port 4000 is running now')
})
