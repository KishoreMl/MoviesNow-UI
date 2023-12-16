import React, { Component } from 'react';

class Legend extends Component {
    
    render() {
        return (
            <div className="legend">
                Sold<button id="sold">{this.props.sold}</button>
                Available<button>{this.props.available}</button>
                Selected<button id="selected">{this.props.selected}</button>
            </div>
        );
    }
}

export default Legend;