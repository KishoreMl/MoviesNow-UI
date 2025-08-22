import React from 'react';

function CastBox(props)
{
        return (
            <div className="castImg">
                <img src={props.cast.image} alt=""/>
                <b><p>{props.cast.name}</p></b>
                <p>{props.cast.role}</p>
            </div>  
        );
}

export default CastBox;