import React from 'react'
import { formStyle } from './register'
import { bodyStyle } from './register'
import axios from 'axios'
const Profile = ()=>{

    const logoutHandler = ()=>{
        axios.post('user/logout').then(result=>{
            localStorage.clear("owner");
            window.location = '/';
        })
    }
    const editDetails = ()=>{
        window.location='/editdetails'
    }

    return(
        <div>
        
            <div style={bodyStyle}>
                <form style={formStyle}>
                    <fieldset>
                        <legend>My Profile</legend>
                        <label>OwnerName</label><br></br>
                        <input type="text" value={localStorage.getItem("ownername")} readOnly></input><br></br>
                        <label>Email</label><br></br>
                        <input type="email" value={localStorage.getItem("owneremail")} readOnly></input><br></br>
                        <button type='button' onClick={logoutHandler}>Logout</button>
                        <button type='button' onClick={editDetails}>Edit Details</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Profile