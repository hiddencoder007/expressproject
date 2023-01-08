const mongoose=require('mongoose')



const footSchema=mongoose.Schema({
    name:String,
    about:String,
    address:String,
    phone:String
})










module.exports=mongoose.model('foot',footSchema)