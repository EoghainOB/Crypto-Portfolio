import React from 'react';

const Totals = ({combined}) => {

    let totals = []
    let pl = []

    for (let i = 0; i < combined.length; i++) {
        const total = combined[i].current_price * combined[i].quantity
        const profitLoss = total - (combined[i].price * combined[i].quantity)
        totals.push(total)
        pl.push(profitLoss)
    }

    const initialValue = 0;
    const totalValues = totals.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
    const totalPl = pl.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

  return (
    <div className='totals'>
        <ul>
        <li><p className='value_label'>Total Portfolio Value:</p></li>
        <li><p className='total_values'>€ {totalValues.toFixed(2)}</p></li>
        <li><p className='value_label'>Total Profit/Loss:</p></li>
        {totalPl > 0 ? <li><p className='pl_values_green'>€ {totalPl.toFixed(2)}</p></li> : <li><p className='pl_values_red'>€ {totalPl.toFixed(2)}</p></li>}
        </ul>
    </div>
  )
}

export default Totals