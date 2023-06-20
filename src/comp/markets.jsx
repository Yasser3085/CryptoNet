import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import axios from 'axios'; 
import '@fontsource/viga';

import '../App.css';

function formatNumber(number) {
  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    }) + 'B';
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    }) + 'M';
  } else {
    return number.toLocaleString();
  }
}

function Markets() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,cardano,stellar,dogecoin,tron,eos,monero,iota,dash,tezos,neo,vechain,cosmos,binancecoin,uniswap,chainlink,aave&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&include_24hr_vol=true'
      )
      .then(response => response.data)
      .then(data => {
        const ids = Object.keys(data).join(',');
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=20&page=1&sparkline=false`
          )
          .then(response => response.data)
          .then(data => {
            const cryptocurrenciesData = data.map(crypto => {
              return {
                name: crypto.name,
                img: crypto.image,
                price: crypto.current_price,
                marketCap: crypto.market_cap,
                change24h: crypto.price_change_percentage_24h,
                volume24h: crypto.total_volume,
              };
            });
            setCryptocurrencies(cryptocurrenciesData);
            setDataLoaded(true); // Set dataLoaded to true when data is available
          })
          .catch(error => {
            console.error('Error fetching cryptocurrency data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching cryptocurrency data:', error);
      });
  }, []);

  return (
    <Flex  className='parent' justifyContent={'center'} alignItems={'center'} direction={'column'}>
      {!dataLoaded ? (
       <div className='vh-100 d-flex jusify-content-center align-items-center'><p style={{fontSize:'30px',fontFamily:'Readex Pro Variable'}}>Loading...</p> </div>
      ) : (
        <>
         
          <div style={{ margin: '3rem 20rem 3rem 20rem ', alignSelf: 'flex-start' }}>
            <h1 className='market-title' style={{fontFamily:'Readex Pro Variable' ,fontSize:'3rem'}}>Markets Overview</h1>
            <h6 style={{fontFamily:'Readex Pro Variable',fontWeight:'light'}}>All Price information is in USD</h6>
          </div>
          <table>
            <thead>
              <tr>
                <th>Cryptocurrency</th>
                <th>Price (USD)</th>
                <th>Market Cap (USD)</th>
                <th>24h Change</th>
                <th>24h Volume</th>
              </tr>
            </thead>
            <tbody>
              {cryptocurrencies.map(crypto => (
                <tr key={crypto.name} className="crypto-row"> {/* Add className="crypto-row" */}
                  <td>
                    <div className="crypto-info">
                      <img src={crypto.img} alt={crypto.name} className="crypto-icon" />
                      <span>{crypto.name}</span>
                    </div>
                  </td>
                  <td>${formatNumber(crypto.price)}</td>
                  <td>${formatNumber(crypto.marketCap)}</td>
                  <td className={crypto.change24h < 0 ? 'negative-change' : 'positive-change'}>
                    {crypto.change24h}%
                  </td>
                  <td>${formatNumber(crypto.volume24h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Flex>
  );
}

export default Markets;
