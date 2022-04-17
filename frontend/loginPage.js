import React, { useState } from 'react'
import Navbar from './navbar.js'
import "../styl.css";
import axios from 'axios';



const bodyStyle = {
    background : 'linear-gradient(#ffffff,#d6ffff)',
    height:"600px",
    display:"flex",
    alignItems:"center"
}

const LoginPage = ()=>{

    const [owner,setOwner] = useState('')
    const [password,setPassword] = useState('')
    const [err,setErr] = useState('')
    const [success,setSuccess] = useState(false)
    const [ownername,setOwnerName] = useState('')

    const SubmitHandler =async (e)=>{
        setOwner('')
        setPassword('')
        console.log(owner,password);
        
        await axios.post('user/login',{owner_name:owner,password:password}).then(result=>{
            setOwnerName(result.data.owner.owner_name);
            console.log(result)
            setErr('')
            setSuccess(true)
            localStorage.setItem("ownername",result.data.owner.owner_name);
            localStorage.setItem("owneremail",result.data.owner.email);
            localStorage.setItem("ownerid",result.data.owner._id);
            window.location='/home';
            console.log("1st line",result);
            
        }).catch(error=>{
           
            console.log(error)
            setErr("Incorrect Credentials");
        })
        
    }

    const ownerHandler = (e)=>{
        setErr('')
        setOwner(e.target.value)
    }

    const passHandler = (e)=>{
        setErr('')
        setPassword(e.target.value)      
    }
    
    return(
        <div>
            <Navbar/>                             
            <div style={bodyStyle}>
                <form className='formStyle'>
                    <fieldset>
                        <legend>LOGIN</legend>
                        <div className='fieldSet'>
                            <label>OwnerName</label><br></br>
                            <input type="text" value={owner} placeholder="Enter owner name" onChange={(e)=>{ownerHandler(e)}} inputMode='numeric' required></input><br></br>
                            <label>Password</label><br></br>
                            <input type="password" value={password} placeholder="Enter password" onChange={(e)=>{passHandler(e)}} required></input><br></br>
                            {
                                owner!=="" && password!==""?
                            <button className="btn" type='submit' onClick={(e)=>SubmitHandler(e)}>Login</button>:<button className="btn" type='submit' onClick={SubmitHandler} disabled={true}>Login</button>
                            }
                            <a href="/register">Create an Account</a>
                            <h1 style={{color:"red"}}>{err}</h1>
                        </div>
                    </fieldset>
                    
                </form>
            </div>
        </div>
    )
}

export default LoginPage