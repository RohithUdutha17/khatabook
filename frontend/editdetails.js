import react from 'react'
import Navbar from './navbar.js'
import "../styl.css";
import axios from 'axios';
import { useState } from 'react/cjs/react.development';

export const formStyle = {
    width : "500px",
    margin:"auto" 
} 

export const bodyStyle = {
    background : 'linear-gradient(#ffffff,#d6ffff)',
    height:"600px",
    display:"flex",
    alignItems:"center"
}

const EditDetailsPage = ()=>{

    const [new_name,setNewName] = useState(localStorage.getItem("ownername"))
    const [email,setEmail] = useState(localStorage.getItem("owneremail"))
    
    const [err,setErr] = useState('')
    
    

    const submitHandler = async()=>{
         
            if(new_name==''){
                setErr("Please enter ownername")   
            }
            else if(email==''){
                setErr("Please enter email")
            }
            else if(!email.includes('@')){
                setErr("Please enter proper email")
            }
            else{
                const owner_name = localStorage.getItem("ownername");
                await axios.post('user/editdetails',{owner_name,new_name,email}).then((result)=>{
                    
                    localStorage.setItem("ownername",new_name);
                    localStorage.setItem("owneremail",email);
                    window.location = '/home'
                }).catch(error=>{
                    setErr(error.message)
                })
            }
    }

    const ownerHandler = (e)=>{
        setErr('')
        setNewName(e.target.value)
    }

    const emailHandler = (e)=>{
        setErr('')
        setEmail(e.target.value)
    }

    return(
        <div>
            <Navbar/>
            <div style={bodyStyle}>
                <form style={formStyle}>
                    <fieldset>
                        <legend>Edit</legend>
                        <label>OwnerName</label><br></br>
                        <input type="text" value={new_name} required placeholder="Enter owner name" onChange={(e)=>{ownerHandler(e)}}></input><br></br>
                        <label>Email</label><br></br>
                        <input type="email" value={email} required placeholder="Enter email" onChange={(e)=>{emailHandler(e)}}></input><br></br>
                        <button type='button' onClick={submitHandler}>Update</button>
                        
                    </fieldset>
                    <h1 style={{color:"red"}}>{err}</h1>
                </form>
            </div>
        </div>
    )
}
export default EditDetailsPage