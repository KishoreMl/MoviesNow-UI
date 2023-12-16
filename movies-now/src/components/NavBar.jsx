import React, { Component } from 'react';

class NavBar extends Component
{
    handleClick(path) {
        window.location = path;
    }
    render() {
        return (
            <div className="navBar">
                <ul>
                    <li onClick={this.handleClick('/home')}>Home</li>
                    <li onClick={this.handleClick('/movies')}>Movies</li>
                    <li onClick={this.handleClick('/')}>Logout</li>
                </ul>
            </div>
        );
    }
}
export default NavBar;