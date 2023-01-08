const mongoose=require('mongoose')


const TestiSchema=mongoose.Schema({
    img:String,
    quotes:String,
    companyname:String,
    status:String,
    postedDate:Date
})









module.exports=mongoose.model('testi',TestiSchema)