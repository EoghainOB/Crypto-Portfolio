import { useState, useEffect } from 'react'
import Header from './components/header';
import Inputs from './components/inputs';
import Footer from './components/footer';
import './App.css';

function App() {

  const [db, setDb] = useState([]);
  const [api, setApi] = useState([]);

  const mergeByName = (a, b) =>
  a.map(itm => ({
      ...b.find((item) => (item.name === itm.coin) && item),
      ...itm
    }));

  const combined = mergeByName(db, api);

  useEffect(() => {
    portfolio()
   },[])

  useEffect(() => {
    coinInfo()
   },[])

  const removeCoin = async (e) => {
    await fetch(`http://localhost:8080/portfolio/${e.target.id}`, {
        method: 'DELETE'
      })
      .then(() => {
        portfolio();
        }
      )
    }
   
  const portfolio = async () => {
    const response = await fetch('http://localhost:8080/portfolio');
    setDb(await response.json())
  }
  
  const coinInfo = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    setApi(await response.json())
  }

    return (
      <div className="App">
        <Header />
        <label>Add to your portfolio</label><input className="input_checkbox" id="trigger" type="checkbox"></input>
        <Inputs />
        <div className='holdings'>
          {combined.reverse().map((data) => {
          return(
            <ul key={data._id}>
              <hr/>
            <li className="coinList">
              <div className="coin_name"><h1>{data.coin}</h1></div>
              <div className="image"><img className="coin_image" alt={data.symbol} src={data.image} /></div>
              <div><h2>Current value: € {(data.quantity * data.current_price).toFixed(2)}</h2>
              <h5> € {((data.quantity * data.current_price)-(data.quantity * data.price)).toFixed(2)}</h5>
              <div className="crypto_value"><h4>{data.symbol.toUpperCase()} = € {data.current_price}</h4></div>
              <h3>Quantity: {data.quantity} | Purchase price: € {data.price} | Initial cost: € {(data.quantity * data.price).toFixed(2)}</h3>
              <button name="remove_btn" id={data._id} onClick={removeCoin}>Remove</button>
              </div>
            </li>
            </ul>)
            })}
        </div>
        <Footer />
      </div>
      );
}

export default App;
