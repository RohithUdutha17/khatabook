import { useState } from 'react'
import Navbar from './navbar'
import axios from 'axios'

const AddCustomer = ()=>{
    
    const [mobile,setMobile] = useState('')
    const [value,setValue] = useState('')
    const [err,setErr] = useState('')
    
    const formStyle = {
        width : "500px",
        margin:"auto" 
    } 

    const bodyStyle = {
        background : 'linear-gradient(#ffffff,#d6ffff)',
        height:"600px",
        display:"flex",
        alignItems:"center"
    }

    const inputHandler = (e)=>{
        setErr('')
        setValue(e.target.value)
    }

    const mobileHandler = (e)=>{
        setErr('')
        setMobile(e.target.value)
    }

    const submitHandler =async ()=>{
        console.log("in");
        
        if(value==''){
            setErr({"message":"Please enter customer name"})
        }
        else if(mobile.length!=10){
            setErr({"message":"please enter proper mobile no"})
        }
        else{
            setValue('')
            setMobile('')
            await axios.post('customer/addCustomer',{customer_name:value,customer_mobile:mobile}).then(result=>{
                alert("Customer added successfully")
            }).catch((error1)=>{
                alert("Either customer exists  or you need to login ")
                setErr(error1)
            })
        }
    }

    return(
        <div>
            <Navbar/>
            <div style={bodyStyle}>
                <form style={formStyle} >
                    <fieldset>
                        <legend>Add Customer</legend>
                        <label>Customer Name</label><br></br>
                        <input type="text" value={value} placeholder="Enter customer name" onChange={(e)=>{inputHandler(e)}}></input>
                        <label>Customer Mobile</label><br></br>
                        <input type="number" value={mobile} placeholder="Enter customer mobile No" onChange={(e)=>{mobileHandler(e)}} maxLength={10}></input>
                        {value!="" && mobile!=""?<button type='button' onClick={submitHandler} >Add Customer</button>:<button type='button' onClick={submitHandler} disabled={true}>Add Customer</button>}                        
                    </fieldset>
                </form>
            </div>
        </div>

    )
}

export default AddCustomer