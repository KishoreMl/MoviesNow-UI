import React from 'react';
import Seat from './Seat';

function SeatRow(props) {
        return (
            <div className="seatrow" >
                {props.seats.map(id =>
                    <Seat onClick={() => props.onSelectSeat(props.rowid,props.rowno,id)}
                        sid={id}
                        className={props.onGetClass(props.rowno, id)}
                        key={id}>
                    </Seat>
                    )}
            </div>
        );
}

export default SeatRow;