const router = require('express').Router() // module
const Header = require('../models/headerTable')
const Query = require('../models/query')



router.get('/',async(req,res)=>{
   
    const headerRecord = await Header.findOne()
    // console.log(headerRecord);

    res.render('index.ejs',{headerRecord:headerRecord})  
});

router.get('/banner',async(req,res)=>{
    const headerRecord = await Header.findOne()
    res.render('banner.ejs',{headerRecord:headerRecord})
}) 

router.post('/query',async(req,res)=>{
    const {query,email}=req.body;
    const status = 'unread'
   const queryRecord= new Query({query:query,email:email,status:status})
   await queryRecord.save();
   res.redirect('/')
})


router.get('/test', async(req,res)=>{
    const title='Nik collections'
    const shortDes = 'all types of dresses are aviable here'
    const longDes = "more details"
    // console.log(title);

    const headerRecord = new Header({title:title,shortDes:shortDes,longDes:longDes})
    await headerRecord.save();
});





module.exports = router;