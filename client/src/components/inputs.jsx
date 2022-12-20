import React, { useState, useEffect } from 'react';

const Inputs = ({api}) => {

	const [coin, setCoin] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault()
		const data = {
			coin: e.target[0].value,
			quantity: e.target[1].value,
			price: e.target[2].value
		}
		fetch('http://localhost:8080/portfolio', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}

	useEffect(() => {
		setCoin(api.map((coin) => coin.name));
	}, [api]);
	
	return (
		<form className="input_form" onSubmit={handleSubmit}>
			<select name='coin'>
				<option value=''>Select Crypto coin</option>
                {coin.map((coin) => (
				<option value={coin}>{coin}</option>
				))}
			</select>
			<hr />
			<input className='numberInputs1' name='quantity' type='number' placeholder='Enter amount of coin' autoComplete="off" />
			<input className='numberInputs2' name='price' type='number' placeholder='Enter price of coin' autoComplete="off" />
			<br/>
			<button>Add</button>
		</form>
	)

}

export default Inputs
