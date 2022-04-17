
const express = require('express')
const mongo = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()


mongo.connect('mongodb://localhost/Khatabook',{useNewUrlParser:true},(err,db)=>{
    if(!err)
        console.log("connected sucessfully2");
    else
        console.log("error",err);
})
//needed to be able to read body data
app.use(express.json())  //to support json encoded bodies
app.use(express.urlencoded({extended:true})) //to support url encoded bodies
app.use(cookieParser())
//this is used to communication between frontend and backend
app.use(
    cors()
)

const UserRoute = require('./user.js')
const CustomerRoute = require('./customers.js')

app.use('/user',UserRoute)
app.use('/customer',CustomerRoute)

app.listen(8000,()=>{
    console.log("listening at port ...");
})