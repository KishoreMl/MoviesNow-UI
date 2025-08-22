import React from 'react';

function CrewBox(props)
{
        return(
            <div className="castImg">
                <img src={props.crew.image} alt=""/>
                <b><p>{props.crew.name}</p></b>
                <p >{ props.crew.role}</p>
            </div>
        );
}

export default CrewBox;