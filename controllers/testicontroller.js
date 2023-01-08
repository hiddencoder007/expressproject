const Testi=require('../models/testi')




exports.testishowadmin=async(req,res)=>{
    const record=await Testi.find().sort({postedDate:-1})
    res.render('admin/testi.ejs',{record})
}

exports.testiupdateadmin=async(req,res)=>{
    const id=req.params.id
    const record=await Testi.findById(id)
    let newStatus=null
    if(record.status=='unpublish'){
        newStatus='publish'
    }else{
        newStatus='unpublish'
    }
    await Testi.findByIdAndUpdate(id,{status:newStatus})
    res.redirect('/admin/testi')
}

exports.testideleteadmin=async(req,res)=>{
    const id=req.params.abc
    await Testi.findByIdAndDelete(id)
    res.redirect('/admin/testi')
}