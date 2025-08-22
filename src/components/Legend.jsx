import React from 'react';

function Legend(props) {
    
    return (
            <div className="legend">
                Sold<button id="sold">{props.sold}</button>
                Available<button>{props.available}</button>
                Selected<button id="selected">{props.selected}</button>
            </div>
        );
}

export default Legend;