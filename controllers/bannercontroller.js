const Banner=require('../models/banner')



exports.bannershowadmin=async(req,res)=>{
    const record=await Banner.findOne()
    res.render('admin/banner.ejs',{record})
}

exports.bannerupdateadmin=async(req,res)=>{
    const id=req.params.abc
    const record=await Banner.findById(id)
    res.render('admin/bannerupdate.ejs',{record})
}

exports.bannerformadmin=async(req,res)=>{
    // const imagename=req.file.filename
    const id=req.params.xyz
    const{title,desc,ldesc}=req.body
    // await Banner.findByIdAndUpdate(id,{title:title,desc:desc,ldesc:ldesc,img:imagename})
    if(req.file){
        const imagename=req.file.filename
        await Banner.findByIdAndUpdate(id,{title:title,desc:desc,ldesc:ldesc,img:imagename}) 
    }else{
        await Banner.findByIdAndUpdate(id,{title:title,desc:desc,ldesc:ldesc})
    }
    res.redirect('/admin/banner')
}