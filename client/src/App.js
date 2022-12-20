import { useState, useEffect } from 'react'
import Header from './components/header';
import Inputs from './components/inputs';
import Footer from './components/footer';
import Totals from './components/totals';
import Holdinginfo from './components/holdinginfo';
import './App.css';

function App() {

  const [db, setDb] = useState([]);
  const [api, setApi] = useState([]);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    portfolio()
   },[api])

  useEffect(() => {
    coinInfo()
   },[])

  const mergeByName = () =>
    db.map(itm => ({
     ...api.find((item) => (item.name === itm.coin) && item),
     ...itm
    }))

  const combined = mergeByName();
    
  const removeCoin = async (e) => {
    await fetch(`http://localhost:8080/portfolio/${e.target.id}`, {
        method: 'DELETE'
      })
      .then(() => {
        portfolio();
      }
    )
  }

  const handleClick = () => {
    setIsShown(!isShown)
  }
   
  const portfolio = async () => {
    const response = await fetch('http://localhost:8080/portfolio');
    setDb(await response.json())
  }
  
  const coinInfo = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=500&page=1&sparkline=false');
    setApi(await response.json())
  }

    return (
      <>
      <Header />
      <div className='buttons'>
      <button onClick={handleClick}>Add to your portfolio</button>
      </div>
      {isShown && <Inputs api={api} portfolio={portfolio}/>}
      <Totals combined={combined}/>
      <div className='holdings'>
          {combined.reverse().map((data) => {
            return (
            <Holdinginfo data={data} removeCoin={removeCoin} />
            );
          })}
        </div>
      <Footer />
      </>
    );
}

export default App;
