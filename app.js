const express=require('express')  //function
const app=express()
app.use(express.urlencoded({extended:false}))
const adminRouter=require('./routers/admin')
const frontendRouter=require('./routers/frontend')
const session=require('express-session')
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/expressproject',()=>{
    console.log('connected to DB expressproject')
})

app.use(session({
    secret:'avinash',
    resave:false,
    saveUninitialized:false
    

}))





app.use('/admin',adminRouter)
app.use(frontendRouter)
app.use(express.static('public'))
app.set('view enigne','ejs')


app.listen(5000)
