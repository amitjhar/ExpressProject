const router = require("express").Router(); //module

const Admin = require("../models/admintable");
const Banner = require("../models/headerTable");
const Query = require("../models/query");
const Contact = require('../models/contact');
const multer = require('multer'); // img module
const Userreg = require("../models/userreg");



    
const storage = multer.diskStorage({
  destination:function(req,file,callback){
      callback(null,'./public/upload');
  },
  filename :function(req,file,callback){
      callback(null,Date.now()+ file.originalname);
  }
});

const upload = multer({
  storage:storage,
  // limits:{fileSize:1024*1024*4} //4MB
})


router.get("/", (req, res) => {
  // res.send('welcome to my admin page')
  res.render("admin/login.ejs");
});

function check(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/admin");
  }
}
router.post("/logindata", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const adminRecord = await Admin.findOne({ username: username });
  console.log(adminRecord);
  if (adminRecord !== null) {
    if (adminRecord.password == password) {
      req.session.isAuth = true; // session trigger
      res.redirect("/admin/dashboard");
    } else {
      res.redirect("/admin");
    }
  } else {
    res.redirect("/admin");
  }
});

router.get("/dashboard", check, (req, res) => {
  // console.log("me loaded")
  // res.send('welcome to dashboard')
  res.render("admin/dashboard");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin/");
});

router.get("/banner", async (req, res) => {
  const bannerRecord = await Banner.findOne();
  res.render("admin/banner.ejs", { bannerRecord: bannerRecord });
});

router.get("/bannerupdate/:id", async (req, res) => {
  const id = req.params.id;
  const bannerRecord = await Banner.findById(id);
  // console.log(bannerRecord)
  res.render("admin/bannerUpdateForm.ejs", { bannerRecord: bannerRecord });
});

router.post("/bannerupdaterecord/:id",upload.single('img'), async (req, res) => {
  const { title, shortDes, longDes } = req.body;
if(  req.file){
  const imageName = req.file.filename;
  const id = req.params.id;
  const bannerRecord = await Banner.findByIdAndUpdate(id, {title: title,shortDes: shortDes,longDes: longDes,image:imageName });
}else{

  const id = req.params.id;
  const bannerRecord = await Banner.findByIdAndUpdate(id, {title: title,shortDes: shortDes,longDes: longDes });

}
  res.redirect("/admin/banner");
});

// router.get('/contact',async(req,res)=>{
//     const contactRecord = await Contact.find();
//     console.log(contactRecord);
//     res.render('admin/contact.ejs',{contactRecord})
// })


router.get("/queryupdate/:id", async (req, res) => {
    const id = req.params.id;
  const queryRecord = await Query.findById(id);
  //  console.log(queryRecord)
  let a = null;
  if (queryRecord.status == "unread") {
    a = "read";
  } else {
    a = "unread";
  }
  await Query.findByIdAndUpdate(id, { status: a });
  res.redirect("/admin/query");
});

router.get("/querydelete/:id", async (req, res) => {
  const id = req.params.id;
  await Query.findByIdAndDelete(id);
  res.redirect("/admin/query");
});


router.get("/query", async (req, res) => {
  const queryRecord = await Query.find();
  console.log(queryRecord);
  res.render("admin/query.ejs", { queryRecord });
});


router.post("/querysearch", async (req, res) => {
  const { search } = req.body;
  const queryRecord = await Query.find({ status: search });
  res.render("admin/query.ejs", { queryRecord });

});

      // user managment 

        router.get('/userlogin',async (req,res)=>{
          const userRecords = await Userreg.find();
         res.render('admin/userreg.ejs',{userRecords})
         console.log(userRecords);
          
        });

        router.get('/userstatusupdate/:id',async (req,res)=>{
          const id = req.params.id;
        const user = await Userreg.findById(id)
        if(user.status === "inactive"){
          await Userreg.findByIdAndUpdate(id, {status: 'active'})
        }
        else {
          await Userreg.findByIdAndUpdate(id, {status: 'inactive'})
        }
        
        res.redirect('/admin/userlogin')

        });

        router.get('/userrole/:id',async(req,res)=>{
          const id = req.params.id;
          const user = await Userreg.findById(id)
          if(user.role === "public"){
            await Userreg.findByIdAndUpdate(id, {role: 'pvt'})
          }
          else {
            await Userreg.findByIdAndUpdate(id, {role: 'public'})
          }
          
          res.redirect('/admin/userlogin')

        });



// test url
router.get("/test", async (req, res) => {
  const user = "amit";
  const pass = "123";

  const adminRecord = new Admin({ username: user, password: pass });
  await adminRecord.save();
});

// for image router 

router.get('/image',(req,res)=>{
    res.render('admin/image.ejs')
})

router.post('/img',upload.single('img'),(req,res)=>{
    console.log(req.file.fieldname);

})

module.exports = router;
