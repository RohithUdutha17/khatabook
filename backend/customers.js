const Customers = require('../models/customers')
const Owners = require('../models/owner')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const customers = require('../models/customers')

const verifyOwner = (req)=>{
        const token = req.cookies['access_token'];
        if(!token){
            throw new Error("You need to login")
        }    
        const {owner_id} = jwt.verify(token,"rohith")   //checking token
        console.log("ffffffff",owner_id);
        return owner_id
}

router.post('/addCustomer',async (req,res)=>{
    const {customer_name,customer_mobile} = req.body
    try{
        const owner_id = verifyOwner(req) 
        console.log("ownerid",owner_id);
        if(!owner_id){
            throw new Error("Token not valid")
        }
        else{
            
            const customer = await Customers.findOne({customer_name})
            if(customer){
                throw new Error("This customer already exists")
            }
            const newCustomer = new Customers({owner_id,customer_name,customer_mobile})
            newCustomer.save((err)=>{
                if(err){
                    throw new Error({"error":err})
                }
                else{
                    res.status(200).send("Customer added successfully")
                }
            })
        }
    }
    catch(err){
        console.log("error:",err.message)
        res.status(400).send(err.message)
    }
})


router.get('/allCustomers/:id', async(req,res)=>{
    const allCustomers = await Customers.find({owner_id:req.params.id})
    res.status(200).send(allCustomers)
})


router.get('/getCustomer/:id',async(req,res)=>{
    const customer =await Customers.findOne({_id:req.params.id})
    const transactions = customer.transactions;
    res.status(200).json({"customer":customer,"total":customer.total,"transactions":transactions})
})

router.post('/addItems/:id',async(req,res)=>{
    const {item_name,quantity,price} = req.body
    const date = String(Date(Date.now()))
    console.log(date);
    const token = req.cookies['access_token'];
    const {owner_id} = jwt.verify(token,"rohith")   //checking token
    const owner = await Owners.findOne({_id:owner_id})
    let duptodaykhata=[];
    let hours = new Date().getHours();
            hours = Number(hours)%12;
            let minutes = new Date().getMinutes();
            let seconds = new Date().getSeconds();
            let time = `${hours}:${minutes}:${seconds}`;
    
    if(owner.items.length!=0){
        if(date.slice(8,10)==owner.items[owner.items.length-1].date.toString().slice(8,10)){
            duptodaykhata = [...owner.items]
        }
        else{
            duptodaykhata = []
        }
    }
   
    try{
            const customer = await Customers.findOne({_id:req.params.id})
            const duparr = [...customer.items]
            const duptransactions = [...customer.transactions]
            let total1=0;
            if(customer.items.length!=0){
                total1=Number(customer.total)+Number(price);
            }
            else{
                total1+=price;
            }
            if(customer.transactions.length!=0){
                
                duptransactions.slice(-1)[0].toBePaid+=Number(price);
            }
            const newItem = {
                item_name,quantity,price,date,time
            }
            const addingCustomerToItem = newItem;
            addingCustomerToItem.customer_name = customer.customer_name;
       
            duptodaykhata.push(addingCustomerToItem)
                    
            duparr.push(newItem)
            
            await Owners.findByIdAndUpdate(
                owner_id,
                {
                    $set : {items:[...duptodaykhata]}
                }
            )

            await Customers.findByIdAndUpdate(
            req.params.id,
            {
                $set : {items:[...duparr],total:total1,transactions:[...duptransactions]}
                
            }
            );
            const updatedCustomer = await Customers.findOne({_id:req.params.id}) 
            console.log(updatedCustomer);
            res.status(200).json({"customer":updatedCustomer,"time":time})    
    }
    catch(err){
        console.log(err);
        res.status(400).json({"error":err.message})
    }
})

router.post('/payment/:id',async(req,res)=>{
    const {amount} = req.body;
    console.log(amount);
    const customer =await Customers.findOne({_id:req.params.id});
    const rembalance = customer.total - amount;
    let hours = new Date().getHours();
    hours = Number(hours)%12;
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let time = `${hours}:${minutes}:${seconds}`;

    try{
        if(rembalance>=0){
            const duparr = [...customer.transactions]
            duparr.push({paid:amount,toBePaid:rembalance,date:new Date(),time:time});
            await Customers.findByIdAndUpdate(req.params.id,
            {
                $set : {transactions:[...duparr],total:rembalance}
            })
            const updatedCustomer = await Customers.findOne({_id:req.params.id}) 
            console.log(updatedCustomer);
            res.status(200).json({"customer":updatedCustomer})
        }
        else{
            throw new Error("Either u r exceeding payable amount or no due left");
        }
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = router
