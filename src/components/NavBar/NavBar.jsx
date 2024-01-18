import {Link} from "react-router-dom"

import "./index.css"

function NavBar(props){
return(
    <header id="header"> 
    <p id="userName">{props.onlineUser.onlineUsername}</p>
    <nav>
        <Link to="/">Home</Link> 
        <Link to="/Authenticate">Authenticate</Link> 
        <Link to="/Transactions">Transactions</Link> 
    </nav></header>
)
}
export default NavBar