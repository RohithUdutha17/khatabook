const router = require('express').Router()
const Owners = require('../models/owner.js')
const {hash,compare} = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/',(req,res)=>{
    console.log('request');
    res.status(200).send("Hello world!");
})

router.post('/register', async(req,res)=>{
    const {shop_name,owner_name,email,password,confirm_password} = req.body;
    
    try{
        const owner = await Owners.findOne({owner_name});
         
        if(owner){
            throw new Error("Owner already exists")
        }
        else{
            if(password!=confirm_password){
                throw new Error("Passwords didn't match")
            }
            const hashedPassword =await hash(password, 10)
            const hashedCPassword =await hash(confirm_password,10)
           
            const newowner = new Owners({shop_name,owner_name,email,password:hashedPassword,confirm_password:hashedCPassword})
            newowner.save((err,result)=>{
                if(err){
                    throw new Error("Error while inserting data")
                }
                else{
                    console.log("inside");
                    res.status(200).send("owner added successfully")
               }
            })
        }
    }
    catch(err){
        res.status(400).send({
            error : `${err.message}`
        })
    }
})

router.post('/editdetails',async(req,res)=>{
    const {owner_name,new_name,email} = req.body;
    console.log(owner_name);
    const owner =await Owners.findOne({owner_name});
    console.log(owner);
    try{
        await Owners.findByIdAndUpdate(owner._id,{
            $set :{owner_name:new_name,email:email}
        })
        res.status(200).send("Updated successfully");
    }
    catch(err){
        res.status(400).send("There is some issue");
    }
})


router.post('/login',async(req,res)=>{
    const {owner_name,password} = req.body;
    const owner = await Owners.findOne({owner_name});   //finding owner 
    console.log(owner_name);
    try{
        if(!owner){                                 //if no owner exists
            throw new Error("Owner not exists")
        }
        else{
            const valid = await compare(password,owner.password) //comparing passwords
            if(!valid){
                throw new Error("Incorrect Password!")
            }
            else{
                console.log("inside");
                const accessToken = jwt.sign(
                    {owner_id:owner._id,owner_name,password},                      //payload
                    "rohith"                                    //secret key
                    )        
                    res.cookie('access_token',accessToken).status(200).json({"token":accessToken,"owner":owner});
            }                   //assigning token to cookie
        }
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({"error":err.message})
    }
})

router.post('/logout',(req,res)=>{
    res.clearCookie('access_token')
    res.status(200).send("logged out");
})


router.get('/getTodayKhata',async(req,res)=>{
    const token = req.cookies['access_token'];
    console.log(token);
    //console.log(String(Date(Date.now())).slice(8,10));
    const {owner_id} = jwt.verify(token,"rohith")   //checking token
    const owner = await Owners.findOne({_id:owner_id})
    console.log(owner);
    const date = Date(Date.now())
    let total=0;
    let items = []
    if(date.toString().slice(8,10)==owner.items[owner.items.length-1].date.slice(8,10)){
        await owner.items.map(item=>total+=item.price)
        items = [...owner.items]
    }
    
    
    res.status(200).json({"items":items,"total":total})
})

module.exports = router

