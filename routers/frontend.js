const router=require('express').Router()
const Banner=require('../models/banner')
const Services=require('../models/services')
const multer=require('multer')
const Testi=require('../models/testi')
const Query=require('../models/query')
const Reg=require('../models/reg')
const Parking=require('../models/parking')
const Bill=require('../models/bill')




function handleLogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/login')
    }
}

function handleroles(req,res,next){
    if(sess.roles=='pvt'){
        next()
    }else{
        res.send("you don't have right to see this page")
    }
}    

let sess=null;





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







router.get('/',handleLogin,async(req,res)=>{
    const serviceRecord=await Services.find({status:'publish'})
    const record=await Banner.findOne()
    const testirecord=await Testi.find({status:'publish'})
    // console.log(sess.username)
    if(sess!==null){
    res.render('index.ejs',{record,serviceRecord,testirecord,username:sess.username})   
    }else{
    res.render('index.ejs',{record,serviceRecord,testirecord,username:'hello'})
    }
})
 
router.get('/banner',handleLogin,async(req,res)=>{
    const record=await Banner.findOne()
    if(sess!==null){
    res.render('banner.ejs',{record,username:sess.username})
    }else{
        res.render('banner.ejs',{record,username:'hello'})

    }
})

router.get('/testi',handleroles,(req,res)=>{
    if(sess!=null){
    res.render('testi.ejs',{username:sess.username})   
    }else{
    res.render('testi.ejs',{username:'hello'})
    }
})

router.post('/testirecords',upload.single('img'),async(req,res)=>{
    const{qt,cname}=req.body
    const imagename=req.file.filename
    const record=new Testi({img:imagename,quotes:qt,companyname:cname,status:'unpublish',postedDate:new Date()})
    await record.save()
    res.redirect('/')
})

router.get('/services/:abc',async(req,res)=>{
    const id=req.params.abc
    const record=await Services.findById(id)
    res.render('services.ejs',{record})
})

router.post('/queryrecord',async(req,res)=>{
    const{email,query}=req.body
    const record=new Query({email:email,query:query,status:'unread'})
    await record.save()
    // console.log(record)
    res.redirect('/')

})

router.get('/reg',(req,res)=>{
    if(sess!==null){
    res.render('reg.ejs',{username:sess.username})
    }else{
        res.render('reg.ejs',{username:'hello'})
    }
})

router.post('/regrecords',async(req,res)=>{
    const{us,pass}=req.body
    const userCheck=await Reg.findOne({username:us})
    if(userCheck==null){
    const record=new Reg({username:us,password:pass,firstname:'',lastname:'',email:'',img:'',status:'suspended',roles:'public',postedDate:new Date()})
    await record.save()
    res.redirect('/login')
    }else{
    // console.log(record)
    res.redirect('/reg')
    }
})

router.get('/login',(req,res)=>{
    if(sess!==null){
    res.render('login.ejs',{username:sess.username})
}else{
    res.render('login.ejs',{username:'hello'})  
}
})

router.post('/loginrecords',async(req,res)=>{
    const{username,pass}=req.body
    const record=await Reg.findOne({username:username})
    if(record!==null){
        if(record.password==pass){
            if(record.status=='active'){
                req.session.isAuth=true
                sess=req.session
                sess.username=username
                sess.roles=record.roles
        res.redirect('/')
        }else{
            res.send('Your account is suspended. Please contact your Admin')
        }
        }else{
            res.redirect('/login')
        }
    }else{
        res.redirect('/login')
    } 

})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    sess=null
    res.redirect('/login')
})

router.get('/profile',async(req,res)=>{
    if(sess!==null){
        const record=await Reg.findOne({username:sess.username})
        res.render('profile.ejs',{record,username:sess.username})    
    }else{
    res.render('profile.ejs',{username:'hello'})
    }
})

router.post('/profilerecords/:id',upload.single('img'),async(req,res)=>{
    const id=req.params.id
    const{fname,lname,email}=req.body
    if(req.file){
    const filename=req.file.filename
    await Reg.findByIdAndUpdate(id,{firstname:fname,lastname:lname,email:email,img:filename})
    }else{
        await Reg.findByIdAndUpdate(id,{firstname:fname,lastname:lname,email:email,img:'image.png'})
    }
    res.redirect('/profile')
})

router.get('/changepassword',(req,res)=>{
    if(sess!==null){
    res.render('passwordchange.ejs',{username:sess.username})
    }else{
    res.render('passwordchange.ejs',{username:'public'})
    }
})

router.post('/changepasswordrecord',async(req,res)=>{
    const{cpass,npass}=req.body
    if(sess.username!==null){
        const record=await Reg.findOne({username:sess.username})
        const id= record.id
        if(record.password==cpass){
            await Reg.findByIdAndUpdate(id,{password:npass})
            res.redirect('/changepassword')
        }else{
            res.send('Current Password is not matched')
        }
    }

})


router.get('/parking',(req,res)=>{
    if(sess!==null){
        res.render('parkingform.ejs',{username:sess.username})
    }else{
        res.render('parkingform.ejs',{username:'hello'})  
    }
})

router.post('/parkingrecord',async(req,res)=>{
    let currentdate=new Date()
    const{vno,vtype}=req.body
    const record=new Parking({vtype:vtype,vin:currentdate,vno:vno,vout:'',vamount:0,vstatus:'IN'})
    await record.save()
    res.redirect('/parkingsys')
})

router.get('/parkingsys',async(req,res)=>{
    if(sess!==null){
        const record=await Parking.find()
        res.render('parkingsys.ejs',{record,username:sess.username})
    }else{
        res.render('parkingsys.ejs',{username:'hello'})  
    }
    
})

router.get('/addparking',(req,res)=>{
    if(sess!==null){
        res.render('parkingform.ejs',{username:sess.username})
    }else{
        res.render('parkingform.ejs',{username:'hello'})  
    }
})

// router.get('/parkingupdate/:id',(req,res)=>{
//     const id=req.params.id
//     if(sess!==null){
//         res.render('parkingupdate.ejs',{id,username:sess.username})
//     }else{
//         res.render('parkingupdate.ejs',{username:'hello'})  
//     }
// })

router.get('/parkingupdaterecord/:id',async(req,res)=>{
    const id=req.params.id
    let outtime=new Date()
    const record=await Parking.findById(id)
    // console.log(record)
    let totalTime=(outtime-record.vin)/(1000*60*60)
    // console.log(totalTime)
    let amount=0
    if(record.vtype=='2w'){
        amount=Math.round(totalTime*30)
    }else if(record.vtype=='3w'){
        amount=Math.round(totalTime*50)
    }else if(record.vtype=='4w'){
        amount=Math.round(totalTime*70) 
    }else if(record.vtype=='lw'){
        amount=Math.round(totalTime*100)
    }else if(record.vtype=='hw'){
        amount=Math.round(totalTime*150)
    }

    await Parking.findByIdAndUpdate(id,{vout:outtime,vamount:amount,vstatus:'OUT'})
    res.redirect('/parkingsys')
})

router.get('/print/:id',async(req,res)=>{
    
    if(sess!==null){
        const id=req.params.id
        const record=await Parking.findById(id)
        res.render('printout.ejs',{record,username:sess.username})
    }else{
        res.render('printout.ejs',{username:'hello'})  
    }
})






router.get('/bill',(req,res)=>{
    if(sess!==null){
        res.render('billform.ejs',{username:sess.username})
    }else{
        res.render('billform.ejs',{username:'hello'})  
    }
})

router.post('/billrecord',async(req,res)=>{
    const{kno,ctype,punit,cunit}=req.body
    const record=new Bill({Kno:kno,ctype:ctype,punit:punit,cunit:cunit,bamount:0})
    await record.save()
    res.redirect('/billsys')
})
router.get('/billsys',async(req,res)=>{
    if(sess!==null){
    const record=await Bill.find()
    res.render('bill.ejs',{record,username:sess.username})
    }else{
        res.render('bill.ejs') 
    }
})

router.get('/billupdate/:id',(req,res)=>{
    const id=req.params.id
    if(sess!==null){
        res.render('billupdate.ejs',{id,username:sess.username})
    }else{
        res.render('billupdate.ejs')
    }
})

router.post('/billupdaterecord/:id',async(req,res)=>{
    const id=req.params.id
    const{cunit}=req.body
    const record=await Bill.findById(id)
    console.log(record)
    
})














module.exports=router