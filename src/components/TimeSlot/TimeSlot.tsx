import React from 'react';
import { TheatreTimeSlot } from '../../model';
import "./TimeSlot.css";

interface TimeSlotProps {
   slot: TheatreTimeSlot;
}
function TimeSlot({ slot }: TimeSlotProps) {
    return (
        <div className="time-slot">
            <span>{slot.time}</span>
            <span className='slot-description'>{slot.screenType}</span>
        </div>
    );
}

export default TimeSlot;
