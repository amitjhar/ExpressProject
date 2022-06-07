const router = require('express').Router() //module
const Admin = require('../models/admintable')
 const Banner = require('../models/headerTable')


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


 router.get('/banner',async(req,res)=>{

    const bannerRecord = await Banner.findOne()
     res.render('admin/banner.ejs',{bannerRecord:bannerRecord})
 })

 router.get("/bannerupdate/:id",async(req,res)=>{
    const id = req.params.id;
    const bannerRecord = await Banner.findById(id)
    // console.log(bannerRecord)
    res.render('admin/bannerUpdateForm.ejs',{bannerRecord:bannerRecord})
 })

 router.post('/bannerupdaterecord/:id',async(req,res)=>{
    const {title,shortDes,longDes}= req.body;
    const id = req.params.id
    const bannerRecord = await Banner.findByIdAndUpdate(id,{title:title,shortDes:shortDes,longDes:longDes})
    res.redirect('/admin/banner')
    
 })

              
 
// test url
router.get('/test',async(req,res)=>{

   const user='amit'
    const pass='123'

    
    const adminRecord= new Admin({username:user,password:pass })
    await adminRecord.save();
})







module.exports=router;

