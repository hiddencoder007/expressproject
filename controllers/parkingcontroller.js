const Parking=require('../models/parking')



exports.parkingshowadmin=async(req,res)=>{
    const record=await Parking.find()
    res.render('admin/parking.ejs',{record})
}