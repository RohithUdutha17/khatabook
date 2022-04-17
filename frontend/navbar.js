
import khatabook from '../Khatabook.jpg'
const Navbar = ()=>{
    
    const navbarStyle = {
        padding : "10px",
        height:"120px",
        backgroundColor:"lightblue",
        textAlign : "center"   
    } 
    
    return(
        <div style = {navbarStyle}>
            <img className='imgStyle' src={khatabook}></img>
        </div>
    )
}

export default Navbar