import React, { useState } from 'react'
import Coininfo from './coininfo';

const Holdinginfo = ({data, removeCoin}) => {

    const [info, setInfo] = useState(false);

    const handleInfo = (e) => {
        setInfo(!info)
      }
    
    const currentValue = (data.quantity * data.current_price).toFixed(2);
    const profitValue = ((data.quantity * data.current_price) - (data.quantity * data.price)).toFixed(2);
    const initialValue = (data.quantity * data.price).toFixed(2);
    
    return (
        <>
            <hr />
            <div className="coin_details">
                <div className="coin_name">
                <h1>{data.coin}</h1>
                <button id={data.symbol} onClick={handleInfo}>&#9432;</button>
                </div>
                <div className="image">
                <img className="coin_image" alt={data.symbol} src={data.image} />
                </div>
            </div>
            <div className='crypto_value'>{data.symbol.toUpperCase()} current price = € {data.current_price} | {data.price_change_percentage_24h.toFixed(2)}% 24hrs</div>
            {info && <Coininfo data={data}/>}
            <div className='coin_content'>
                <ul className='price_content'>
                <li><p className='value_label'>Current value: </p></li>
                <li><p className='current_value'>€ {currentValue}</p></li>
                <li><p className='value_label'>Profit/Loss: </p></li> 
                {profitValue > 0 ? <li><p className='profit_value_green'>€ {profitValue}</p></li> : <li><p className='profit_value_red'>€ {profitValue}</p></li>}
                </ul>
                <ul className='investment'>
                <li><b>Quantity:</b> {data.quantity}</li>
                <li><b>Purchase price:</b> € {data.price.toFixed(2)}</li>
                <li><b>Initial cost:</b> € {initialValue}</li>
                </ul>
            </div>
            <div className='buttons'>
                <button name="remove_btn" id={data._id} onClick={removeCoin}>Remove</button>
            </div>
        </>
  )
}

export default Holdinginfo