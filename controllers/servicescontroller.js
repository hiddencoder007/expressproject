const Services=require('../models/services')



exports.serviceshowadmin=async(req,res)=>{
    const record=await Services.find().sort({postedDate:-1})
    const totalServices=await Services.count()
    const totalpublish=await Services.count({status:'publish'})
    const totalunpublish=await Services.count({status:'unpublish'})
    res.render('admin/services.ejs',{record,totalServices,totalpublish,totalunpublish})
}

exports.servicesformadmin=(req,res)=>{
    res.render('admin/serviceform.ejs')
}

exports.servicesrecordadmin=(req,res)=>{
    const{title,desc,ldesc}=req.body
    const imagename=req.file.filename
    const record=new Services({title:title,desc:desc,img:imagename,ldesc:ldesc,status:'unpublish',postedDate:new Date()})
    record.save()
    res.redirect('/admin/services')
}

exports.servicesstatusadmin=async(req,res)=>{
    const id=req.params.abc
    const record=await Services.findById(id)
 //    console.log(record)
     let newStatus=null
     if(record.status=='unpublish'){
         newStatus='publish'
     }else{
         newStatus='unpublish'
     }
     await Services.findByIdAndUpdate(id,{status:newStatus})
     res.redirect('/admin/services')
 }

 exports.servicesdeleteadmin=async(req,res)=>{
    const id=req.params.xyz
    await Services.findByIdAndDelete(id)
    res.redirect('/admin/services')

}

exports.servicessearchformadmin=async(req,res)=>{
    const{search}=req.body
    const record=await Services.find({status:search}).sort({postedDate:-1})
    // console.log(record)
    const totalServices=await Services.count()
    const totalpublish=await Services.count({status:'publish'})
    const totalunpublish=await Services.count({status:'unpublish'})
    res.render('admin/services.ejs',{record,totalServices,totalpublish,totalunpublish})

}

