const mongoose=require('mongoose')


const billSchema=mongoose.Schema({
    Kno:Number,
    ctype:String,
    punit:Number,
    cunit:Number,
    bamount:Number,
})




module.exports=mongoose.model('bill',billSchema)