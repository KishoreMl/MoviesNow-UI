import React from 'react';
import { Crew } from '../model';


const CrewBox: React.FC<Crew> = ({name, role, imageUrl}) => {
        return(
            <div className="castImg">
                <img src={imageUrl} alt=""/>
                <b><p>{name}</p></b>
                <p >{role}</p>
            </div>
        );
};

export default CrewBox;