const Query=require('../models/query')


exports.queryshowadmin=async(req,res)=>{
    const record=await Query.find()
    res.render('admin/query.ejs',{record})
}

exports.queryreplyadmin=async(req,res)=>{
    const id=req.params.don
    const record=await Query.findById(id)
    res.render('admin/queryreply.ejs',{record})

}

exports.queryreplyformadmin=async(req,res)=>{
    const id=req.params.id
 // const path=req.file.path
 const{emailto,emailsub,emailbody}=req.body

 let transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
       user: 'hiddencoding404@gmail.com', // generated ethereal user
       pass: 'ybrlbdzosrgfnmhc', // generated ethereal password
     },
   });
     if(req.file){
         const path=req.file.path
   // send mail with defined transport object
   let info = await transporter.sendMail({
     from: 'hiddencoding404@gmail.com', // sender address
     to: emailto, // list of receivers
     subject: emailsub, // Subject line
     text: emailbody, // plain text body
     // html: "<b>Hello world?</b>", // html body
     attachments:[{
         path:path
     }]
   });
 }else{
         // send mail with defined transport object
   let info = await transporter.sendMail({
     from: 'hiddencoding404@gmail.com', // sender address
     to: emailto, // list of receivers
     subject: emailsub, // Subject line
     text: emailbody, // plain text body
     // html: "<b>Hello world?</b>", // html body
   });
 }
 await Query.findByIdAndUpdate(id,{status:'read'})
   res.redirect('/admin/query')
}


exports.querysearchformadmin=async(req,res)=>{
    const{search}=req.body
    const record=await Query.find({status:search})
    res.render('admin/query.ejs',{record})  
}

exports.queryupdateadmin=async(req,res)=>{
    const id=req.params.id
    await Query.findByIdAndDelete(id)
    res.redirect('/admin/query')   
}