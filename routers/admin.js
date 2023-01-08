const router=require('express').Router()
const multer=require('multer')
const bcrypt=require('bcrypt')
const Adminreg=require('../models/adminreg')
const Banner=require('../models/banner')
const Services=require('../models/services')
const Testi=require('../models/testi')
const Query=require('../models/query')
const nodemailer=require('nodemailer')
const Reg=require('../models/reg')
const Parking = require('../models/parking')
const cservices=require('../controllers/servicescontroller')
const ctesti=require('../controllers/testicontroller')
const cbanner=require('../controllers/bannercontroller')
const cquery=require('../controllers/querycontroller')
const cuser=require('../controllers/usercontroller')
const cparking=require('../controllers/parkingcontroller')


const Footer=require('../models/foot')









let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})



let upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*6}
})


// router.get('/',async(req,res)=>{
//     let a='12345'
//     const converteda=await bcrypt.hash(a,10)
//     console.log(converteda)//     // res.render('admin/login.ejs')
// })


function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin/')
    }
}




router.get('/',(req,res)=>{
    res.render('admin/login.ejs')
})


router.post('/login',async(req,res)=>{
// console.log(req.body)
const{us,pass}=req.body
const record=await Adminreg.findOne({username:us})
// console.log(record)
if(record!==null){
       const checkedpassword=await bcrypt.compare(pass,record.password)
    //    console.log(checkedpassword)
       if(checkedpassword){
        req.session.isAuth=true
    res.redirect('/admin/dashboard')
    }else{
        res.redirect('/admin/')
    }    
}else{
    res.redirect('/admin/')
}
})


router.get('/dashboard',handlelogin,(req,res)=>{
     res.render('admin/dashboard.ejs')
})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/admin/')
})

router.get('/banner',cbanner.bannershowadmin)

router.get('/bannerupdate/:abc',cbanner.bannerupdateadmin)

router.post('/updaterecord/:xyz',upload.single('img'),cbanner.bannerformadmin)

router.get('/services',cservices.serviceshowadmin)

router.get('/serviceadd',cservices.servicesformadmin)

router.post('/servicerecords',upload.single('img'),cservices.servicesrecordadmin)

router.get('/servicestatusupdate/:abc',cservices.servicesstatusadmin)

router.get('/servicesdelete/:xyz',cservices.servicesdeleteadmin)

router.get('/testi',ctesti.testishowadmin)

router.get('/testiupdate/:id',ctesti.testiupdateadmin)

router.get('/testidelete/:abc',ctesti.testideleteadmin)

router.get('/query',cquery.queryshowadmin)

router.get('/queryreply/:don',cquery.queryreplyadmin)

router.post('/queryrecord/:id',upload.single('upload'),cquery.queryreplyformadmin)


router.post('/servicesearch',cservices.servicessearchformadmin)

router.post('/querysearch',cquery.querysearchformadmin)

router.get('/querydelete/:id',cquery.queryupdateadmin)

router.get('/users',cuser.usershowadmin)

router.get('/userstatusupdate/:id',cuser.userstatusupdateadmin)

router.get('/usersdelete/:id',cuser.userupdateadmin)

router.get('/roleupdate/:id',cuser.userroleupdateadmin)



router.get('/parking',cparking.parkingshowadmin)

router.get('/footer',(req,res)=>{
    res.render('admin/footer.ejs')
})

router.get('/footerupdate',(req,res)=>{
    res.render('admin/footerupdate.ejs',{record})
})

router.post('/footerrecord/:id',(req,res)=>{
    console.log(req.body)
     res.redirect('/admin/footer')

})














//-----------------------test url-----------------------------//

router.get('/test',async(req,res)=>{
    // let a='12345'
    // const converteda=await bcrypt.hash(a,10)
    // console.log(converteda)
    const record=new Banner({title:'title',desc:'desc',img:'',ldesc:'ldesc'})
    await record.save()
    // console.log(record)
})






module.exports=router