import axios from 'axios'
import {useState} from 'react'
import Navbar from './navbar'
import { useParams } from 'react-router'
import { useEffect } from 'react/cjs/react.development'




export const itemsStyle = {
    display:"flex",
    justifyContent:"space-around",
}
export const item_card = {
    padding:'10px',
    fontSize:"10px",
    textTransform:"uppercase",
   // boxShadow : "2px 2px 2px 2px lightgray",
   borderBottom:"1px solid black", 
   margin:"auto",
    textAlign:"center",
    width:"90%"
}

const EachCustomer = ()=>{ 
    const [time,setTime] = useState('')
    const [amount,setAmount] = useState(0)
    const [transactions,setTransactions] = useState([])
    const {id} = useParams()
    const [item_name,setItemName] = useState('')
    const [quantity,setQuantity] = useState('')
    const [price,setPrice] = useState('')
    const [total,setTotal] = useState(0)
    const [allow,setAllow] = useState(false)
    const [customer,setCustomer] = useState({}) 
    const [err,setErr] = useState('')

    useEffect(async()=>{

        await axios.get(`/customer/getCustomer/${id}`).then(result=>{
            
             setCustomer(result.data.customer)
             setTransactions(result.data.transactions)
             setTotal(result.data.total)
             setAllow(true)
        })
    
    },[])

    const submitHandler = async()=>{
        await axios.post('/customer/addItems/'+id,{item_name,quantity,price}).then((result)=>{
            console.log(result);
            setItemName('')
            setQuantity('')
            setPrice('')
            setCustomer(result.data.customer)
            setTime(result.data.time)
            setTotal(result.data.customer.total)
            setTransactions(result.data.customer.transactions)
        })
    }

    const itemNameHandler = (e)=>{
        setItemName(e.target.value)
    }

    const quantityHandler = (e)=>{
        setQuantity(e.target.value)
    }

    const priceHandler = (e)=>{
        setPrice(e.target.value)
    }

    const AmountHandler = (e)=>{
        setAmount(e.target.value)
    }

    const deductAmount = async()=>{
       await axios.post('/customer/payment/'+id,{amount}).then((result)=>{
            setAmount(0)
            alert("paid successfully");
            setTransactions(result.data.customer.transactions);
            setTotal(result.data.customer.total)
        }).catch(err=>{
            setErr('Either u r exceeding payable amount or no due left')
            alert('Either u r exceeding payable amount or no due left')
        })
    }

    const scrollToView = (id)=>{
        document.getElementById(id).scrollIntoView(true);
    }

    return(
        
        <div>
            <Navbar/>
            {allow ?
            <div>
                <p style={{"textAlign":"center"}}>
                    <a onClick={()=>scrollToView('khata')} className="hello">Khata</a>
                    <a onClick={()=>scrollToView('payment')} className="hello">Payment</a>
                    <a onClick={()=>scrollToView('transactions')} className="hello">Transactions</a>
                </p>
                <h1 style={{"color":"green"}}>{customer.customer_name}</h1><h2 style={{"textAlign":"center"}}> Amount to be paid : {total} rs</h2>
                <div >
                
                    <form className='formStyle'>
                    
                        <fieldset>
                            <legend>Add Items</legend>
                            <label>Item Name</label><br></br>
                            <input type="text" value={item_name} placeholder='enter item name' onChange={(e)=>{itemNameHandler(e)}}></input><br></br>
                            <label>Quantity</label><br></br>
                            <input type="text" value={quantity} placeholder='enter quantity' onChange={(e)=>{quantityHandler(e)}}></input><br></br>
                            <label>Price</label><br></br>
                            <input type = 'number' value={price} placeholder='enter price' onChange={(e)=>{priceHandler(e)}}></input><br></br>
                            {item_name!="" && quantity!='' && price!=0 ? <button type='button' onClick={submitHandler}>Add item</button>:<button type='button' onClick={submitHandler} disabled={true}>Add item</button>}
                            
                        </fieldset>
                        <h1 id='payment'>Payment</h1>
                        <fieldset >
                            <legend>Pay</legend>
                            <label>Enter amount </label>
                            <input type="number" value={amount} onChange={(e)=>{AmountHandler(e)}}></input>
                            {amount!=0 ?
                            <button type='button' onClick={deductAmount}>Pay</button>
                            :
                            <button type='button' onClick={deductAmount} disabled={true}>Pay</button>
                            }               
                        </fieldset>
                        
                    </form>
                </div>
                <h1 id="khata">Khata</h1>
                {customer.items.length!=0 ?
                <div style={{overflowX:"auto"}}>
                <table>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                {
                    customer.items.map(item=>{
                        return( 
                                
                                <tr key={item._id}>
                                    <td>{item.item_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹ <b>{item.price}</b></td>
                                    <td>{item.date.toString().slice(0,15)}</td>
                                    <td>{item.time}</td>
                                </tr>
                        )
                    })
                
                }
                </table>
                </div>
                : <h2 style={{textAlign:"center"}}>No khata yet</h2>   }
                <h1 id="transactions">Transactions</h1>
                <div>
                <table>
                {
                    transactions.map(t=>{
                        return(
                        <tbody key={t._id}>
                        <tr >
                            <td>PAID AMOUNT ON {String(t.date).slice(0,10)} {t.time}</td>
                            <td><b>₹{t.paid}</b></td>
                        </tr>
                        <tr >
                            <td>REMAINING KHATA</td>
                            <td><b>₹{t.toBePaid}</b></td>
                        </tr>
                        </tbody>
                    )}
                    )
                }
                </table>
                </div>
            </div>
            :  <h2 style={{textAlign:"center"}}>No transactions yet</h2> }
        </div>      
    )
}

export default EachCustomer