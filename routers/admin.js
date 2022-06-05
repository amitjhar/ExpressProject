const router = require('express').Router() //module
const Admin = require('../models/admintable')


router.get('/',(req,res)=>{
    // res.send('welcome to my admin page')
    res.render('admin/login.ejs');

})  


function check(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin')
    }
}
router.post('/logindata',async(req,res)=>{
    const{username,password} = req.body;
    console.log(username, password)
    const adminRecord = await  Admin.findOne({username:username})
    console.log(adminRecord);
    if(adminRecord !== null){
        if(adminRecord.password == password){
            req.session.isAuth = true;  // session trigger  
        res.redirect('/admin/dashboard')
        }else{
            res.redirect('/admin')
        }
    }
    else{
        res.redirect('/admin')
    }
}); 

router.get('/dashboard',check, (req,res)=>{
    // console.log("me loaded")
    // res.send('welcome to dashboard')
    res.render('admin/dashboard')
})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/admin/')
})

              
 
// test url
router.get('/test',async(req,res)=>{

   const user='amit'
    const pass='123'

    
    const adminRecord= new Admin({username:user,password:pass })
    await adminRecord.save();
})







module.exports=router;


