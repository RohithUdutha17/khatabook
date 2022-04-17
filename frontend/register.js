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

const RegisterPage = ()=>{
    const [shop_name,setShopName] = useState('')
    const [owner_name,setOwnerName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirm_password,setConfirmPassword] = useState('')
    const [err,setErr] = useState('')

    

    const submitHandler = async()=>{
        console.log('mm');
            if(owner_name==''){
                setErr("Please enter ownername")   
            }
            else if(email==''){
                setErr("Please enter email")
            }
            else if(!email.includes('@')){
                setErr("Please enter proper email")
            }
            else if(password==''){
                setErr("Please enter password")
            }
            else if(confirm_password==''){
                setErr("Please enter confirm_password")
            }
            else{
                await axios.post('user/register',{shop_name,owner_name,email,password,confirm_password}).then((result)=>{
                    window.location = '/'
                }).catch(error=>{
                    setErr("")
                })
            }
    }
    
    const shopHandler = (e)=>{
        setShopName(e.target.value);
    }

    const ownerHandler = (e)=>{
        setErr('')
        setOwnerName(e.target.value)
    }

    const emailHandler = (e)=>{
        setErr('')
        setEmail(e.target.value)
    }

    const passwordHandler = (e)=>{
        setErr('')
        setPassword(e.target.value)
    }

    const confirmPasswordHandler = (e)=>{
        setErr('')
        setConfirmPassword(e.target.value)
    }

    return(
        <div>
            <Navbar/>
            <div style={bodyStyle}>
                <form style={formStyle}>
                    <fieldset>
                        <legend>REGISTER</legend>
                        <label>ShopName</label><br></br>
                        <input type="text" value={shop_name} required placeholder="Enter shop name" onChange={(e)=>{shopHandler(e)}}></input><br></br>

                        <label>OwnerName</label><br></br>
                        <input type="text" value={owner_name} required placeholder="Enter owner name" onChange={(e)=>{ownerHandler(e)}}></input><br></br>
                        <label>Email</label><br></br>
                        <input type="email" value={email} required placeholder="Enter email" onChange={(e)=>{emailHandler(e)}}></input><br></br>
                        <label>Password</label><br></br>
                        <input type="password" value={password} required placeholder="Enter password" onChange={(e)=>{passwordHandler(e)}}></input><br></br>
                        <label>Confirm Password</label><br></br>
                        <input type="password" value={confirm_password} required placeholder="Enter confirm password" onChange={(e)=>{confirmPasswordHandler(e)}}></input><br></br>
                        <button type='button' onClick={submitHandler}>Register</button>
                        <a href="/">Login</a>
                    </fieldset>
                    <h1 style={{color:"red"}}>{err}</h1>
                </form>
            </div>
        </div>
    )
}
export default RegisterPage