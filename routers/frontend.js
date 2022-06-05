const router = require('express').Router() // module
const Header = require('../models/headerTable')



router.get('/',async(req,res)=>{
   
    const headerRecord = await Header.findOne()
    // console.log(headerRecord);

    res.render('index.ejs',{headerRecord:headerRecord})  
});

router.get('/banner',async(req,res)=>{
    const headerRecord = await Header.findOne()
    res.render('banner.ejs',{headerRecord:headerRecord})
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