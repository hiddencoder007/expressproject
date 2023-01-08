const mongoose=require('mongoose')

const regSchema=mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String,
    email:String,
    img:String,
    status:String,
    roles:String,
    postedDate:Date
})








module.exports=mongoose.model('reg',regSchema)