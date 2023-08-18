import React from "react";
import { Link } from "react-router-dom";

function NavBar(){
    return(
        <div>
                         
            <li><Link to="/">Home</Link></li>
            <li><Link to={{pathname: '/loginAdmin'}}>Admin Login</Link></li>           
            
        </div>
    )
}

export default NavBar;