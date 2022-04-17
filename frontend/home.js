import {borderStyle} from './viewcustomers'
import {useState} from 'react'
import { useEffect } from 'react/cjs/react.development'
import axios from 'axios'
import {MdAccountCircle} from "react-icons/md"
import khatabook from '../Khatabook.jpg'



const todayKhataStyle = {
    padding:'10px',
    fontSize:"10px",
    textTransform:"uppercase",
    boxShadow : "2px 2px 2px 2px lightgray",
    margin:"5px",
    display:"block",
    textAlign:"center"

}

const Home = ()=>{
    const [arr,setArr] = useState([])
    const [allow,setAllow] = useState(false)
    const [total,setTotal] = useState(0)
    
    useEffect(async()=>{
        await axios.get('user/getTodayKhata').then((result)=>{
            console.log(result);
            // const newdate = String(new Date()).slice(8,10);
            // const itemsdate = String(result.data.items[result.data.items.length-1].date).slice(8,10)
            // if(newdate==itemsdate){
            //     setArr(result.data.items)
               
            // }
            // else{
                setArr(result.data.items)
                setTotal(result.data.total)
            // }
            setAllow(true)
            
        })
    },[])

    const featuresStyle = {
        display:"flex",
        width:"100%",
        justifyContent:"space-between",
        flexWrap:"wrap",
        alignItems:"flex-start"
    }

    const profile = ()=>{
        window.location='/profile';
    }

    return(
        <div>
            <div className='homepage'>
                <img className='img' src={khatabook}></img>
                <MdAccountCircle onClick={profile} className="profile"/>
            </div>
            <div style={featuresStyle}>
                <a href="/addcustomer" className="features">ADD CUSTOMER</a>
                { allow ?
                <div id="main">
                    <h1 style={{textAlign:"center",color:"green"}}>ALL KHATAS OF TODAY ARE HERE </h1>
                    <h1>Today's Khata amount : ₹{total}</h1>
                    { arr.length!= 0 ?
                    <div className='todaykhata' >
                    
                    <table className='tablewidth'>
                        <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            {/* <th>Date</th>
                            <th>Time</th> */}
                        </tr>
                        </thead>
                        
                       { arr.map(item=>{
                            return(
                                
                                    <tr key={item._id}>
                                        <td>{item.customer_name}</td>
                                        <td>{item.item_name}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹{item.price}</td>
                                        {/* <td>{item.date.toString().slice(0,10)}</td>
                                        <td>{item.time}</td> */}
                                    </tr>
                            )
                        })}
                                
                         
                         </table>
                         </div>
                         : <h1>NO KHATA TODAY YET</h1> }
                    </div>
                    
                 : ' '}
                 
                <a href="/viewcustomers" className="features">VIEW CUSTOMERS</a>
            </div>
        </div>
    )
}

export default Home