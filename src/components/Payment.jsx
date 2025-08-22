import React, { useState } from "react";

function Payment(props) {

    const [name, setName] = useState("");
    const [cardNo, setCardNo] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [ccv, setCcv] = useState("");
    
    function onChangeCardNo(e){setCardNo(e.target.value)}
    function onChangeName(e){setName(e.target.value)}
    function onChangeMonth(e){setMonth(e.target.value)}
    function onChangeYear(e){setYear(e.target.value)}
    function onChangeCCV(e){setCcv(e.target.value)}
    function onSubmit(e)
    {
        e.preventDefault();
        window.location = '/paymentotp/' + props.ticketId;
    }

    return (
            <div className="payment">
                <form onSubmit={onSubmit}>
            
                    <h2>Card Details</h2>
                    <input type="text"
                        onChange={onChangeCardNo}
                        value={cardNo}
                        placeholder="Card Number" />
                    <br />

                    <input type="text"
                        onChange={onChangeName}
                        value={name}
                        placeholder="Name on the Card" />
                    <br />

                    <input type="text"
                        id="small"
                        onChange={onChangeMonth}
                        value={month}
                        placeholder="MM" />
                    
                    <input type="text"
                        id="small"
                        onChange={onChangeYear}
                        value={year}
                        placeholder="YY" />
                    <br />

                    <input type="password"
                        onChange={onChangeCCV}
                        value={ccv}
                        placeholder="CCV" />
                    <br />
    	            <button type="submit" value="submit">Make Payment</button>

                </form>
        
            </div>
        );
}

export default Payment;