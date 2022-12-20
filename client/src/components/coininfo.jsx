import React from 'react'

const Coininfo = ({data}) => {
  return (
        <>
            <ul className='coin_extra'>
            <li><p className='coin_extra_detail'><b>24h high:</b> € {data.high_24h}</p></li>
            <li><p className='coin_extra_detail'><b>24h low:</b> € {data.low_24h}</p></li>
            <li><p className='coin_extra_detail'><b>Total volume:</b> {data.total_volume}</p></li>
            <li><p className='coin_extra_detail'><b>ATH:</b> € {data.ath}</p></li>
            <hr/>
            <li><p className='coin_extra_detail'><b>Market cap rank:</b> # {data.market_cap_rank}</p></li>
            <li><p className='coin_extra_detail'><b>Market cap:</b> € {data.market_cap}</p></li>
            <li><p className='coin_extra_detail'><b>Max supply:</b> {data.max_supply}</p></li>
            </ul>
        </>
        )
}

export default Coininfo