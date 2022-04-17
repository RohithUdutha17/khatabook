//import react from 'react'
import Navbar from './navbar'
import {itemsStyle} from './eachcustomer'
const StartPage = ()=>{
    return(
        <div style={itemsStyle}>
            <Navbar/>
            <a href="/login" className='features'>Login</a>
            <a href='/register' className='features'>Register</a>
        </div>
    )
}

export default StartPage