import React from 'react';
import logo from '../../assests/images/logo.png';
import './Header.css';
function Header()
{
    return (
        <div className="header">
            <img src={logo} alt=""/>
        </div>  
    );
}

export default Header;