//import react from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './loginPage'
import Register from './register.js'
import Home from './home'
import AddCustomer from './addcustomer'
import ViewCustomers from './viewcustomers'
import EachCustomer from './eachcustomer'
import StartPage from './startPage'
import Navbar from './navbar'
import Profile from "./profile"
import EditDetailsPage from "./editdetails"
const Routers = ()=>{
 return(
 <div>      
    <Router>
        <Routes>
        {/* <Route path="/" element={<StartPage/>} exact /> */}
            <Route path="/" element={<Login/>} exact />
            <Route path="/register" element={<Register/>} exact/>
            <Route path="/home" element={<Home/>}exact/>
            <Route path="/addcustomer" element={<AddCustomer/>} exact/>
            <Route path="/viewcustomers" element={<ViewCustomers/>} exact/>
            <Route path="/eachcustomer/:id" element={<EachCustomer/>} exact/>
            <Route path="/profile" element={<Profile/>} exact></Route>
            <Route path='/editdetails' element={<EditDetailsPage/>} exact></Route>
            <Route path="/:lang" element={<Login/>} exact/>
       </Routes>
    </Router>
</div>
 )
}

export default Routers