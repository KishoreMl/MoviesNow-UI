import React, { Component } from 'react';

class NavBar extends Component
{
    render() {
        return (
            <div className="navBar">
                <ul>
                    <li>Home</li>
                    <li>Movies</li>
                    <li>Logout</li>
                </ul>
            </div>
        );
    }
}
export default NavBar;