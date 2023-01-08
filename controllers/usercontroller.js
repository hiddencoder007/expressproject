const Reg=require('../models/reg')



exports.usershowadmin=async(req,res)=>{
    const record=await Reg.find().sort({postedDate:-1})
    res.render('admin/users.ejs',{record})
}

exports.userstatusupdateadmin=async(req,res)=>{
    const id=req.params.id
    const record=await Reg.findById(id)
    let newStatus=null
    if(record.status=='suspended'){
        newStatus='active'
    }else{
        newStatus='suspended'
    }
    await Reg.findByIdAndUpdate(id,{status:newStatus})
    res.redirect('/admin/users')
   
}

exports.userupdateadmin=async(req,res)=>{
    const id=req.params.id
    await Reg.findByIdAndDelete(id)
    res.redirect('/admin/users')    
}

exports.userroleupdateadmin=async(req,res)=>{
    const id=req.params.id
    const record=await Reg.findById(id)
        let newRole=null
    if(record.roles=='public'){
        newRole='pvt'
    }else{
        newRole='public'
    }
    await Reg.findByIdAndUpdate(id,{roles:newRole})
    res.redirect('/admin/users')
}