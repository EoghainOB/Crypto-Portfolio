import React, { Component } from 'react'

class Inputs extends Component {

constructor(props) {
	super(props)
	this.state = { coin: "", quantity: "", price: "" }
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
}

handleSubmit() {
	fetch('http://localhost:8080/portfolio', {
		method: 'POST',
        mode: 'cors',
        headers: {
			'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
	})
}

handleChange(event) {
	this.setState({
	[event.target.name] : event.target.value
	})
}

render() {
	return (
	<form className="input_form" onSubmit={this.handleSubmit}>
		<input name='coin' type='text' placeholder='Enter Crypto coin' autoComplete="off" value = {this.state.coin} onChange={this.handleChange} />
		<input name='quantity' type='number' placeholder='Enter amount of coin' autoComplete="off" value={this.state.quantity} onChange={this.handleChange} />
		<input name='price' type='number' placeholder='Enter price of coin' autoComplete="off" value={this.state.price} onChange={this.handleChange} />
		<br/>
		<button>Add</button>
	</form>
	)
    }
}

export default Inputs
