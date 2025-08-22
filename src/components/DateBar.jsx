import React from 'react';

function DateBar(props) {
   
        return (
            <div className="dateBar">
                <div className="dateBar-sub">
                {props.Dates.map(date =>
                    <button className="date"
                        id={props.getId(date.id)}
                        key={date.id}
                        onClick={() => props.onClick(date.id, date.day, date.month)}>
                        <p>{date.day}<br />{date.month}</p>
                    </button>
                    )}   
                </div>    
            </div>
        );
}

export default DateBar;