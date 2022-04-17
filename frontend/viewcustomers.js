import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "./navbar"
import {MdCall} from 'react-icons/md'
export const borderStyle = {
    height:"430px",
    textAlign:"center",
    margin:"0 auto",
    border:"2px solid black",
    overflow:"scroll"
}

export const eachCustomerStyle = {
    padding:'10px',
    fontSize:"30px",
    textTransform:"uppercase",
    boxShadow : "2px 2px 2px 2px lightgray",
    margin:"5px",
    display:"block",
    textAlign:"center"
}

const ViewCustomers = ()=>{
    const [arr,setArr] = useState([])
    const [filteredArr,setFilteredArray] = useState([])
    const [value,setValue] = useState("")
    const [customerexists,setCustomerExists] = useState(false)

    useEffect(()=>{
        axios.get('customer/allCustomers/'+`${localStorage.getItem("ownerid")}`).then((result)=>{
            console.log(result);
            setArr(result.data)
            setFilteredArray(result.data)
        })
    },[])

    const searchBackground = {
        backgroundColor:"#ffd6ff",
        padding:"10px",
        margin:"5px 0px"
    }
    
    const inputStyle = {
        width:"50%",
        margin:"auto"
    }
    
    const searchHandler = (e)=>{
        let res = []
        res = arr.filter(ele=>{if(ele.customer_name.toLowerCase().includes(e.target.value.toLowerCase())) return ele})
        setValue(e.target.value)
        setFilteredArray(res)
        console.log(res);
    }

    return(
        <div>
            <Navbar/>
            <div style={searchBackground}>
                <div style={inputStyle}>
                    <input type="text" placeholder="Search for customers" onChange={(e)=>{searchHandler(e)}}></input>
                </div>
            </div>
            <h1 style={{textAlign:"center",color:"green"}}>CUSTOMERS : {arr.length}</h1>
            <div style={borderStyle} className="width">{
                filteredArr.length!=0?
                filteredArr.map(ele=>{
                    return <a href={'/eachcustomer/'+ele._id} style={eachCustomerStyle} className="customers" key={ele._id}>{ele.customer_name}<div class="tooltip"><MdCall/>
  <span class="tooltiptext">{ele.customer_mobile}</span>
</div> </a>
                }):<a href='/addCustomer'>Add Customer</a>}
            </div>
        </div>
    )
}
export default ViewCustomers