const mongoose=require('mongoose')

const admingregSchema=mongoose.Schema({
    username:String,
    password:String
})








module.exports=mongoose.model('adminreg',admingregSchema)