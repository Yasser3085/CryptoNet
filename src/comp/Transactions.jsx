import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const apiKey = '17USV69F2SB1R3JIFBVGK3J82M5MXF7QHG';
    const address = '0xC553F48286bbEa6753C58EE779ba344f7796A9E3';

    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === '1') {
          setTransactions(data.result);
        } else {
          console.error('Error fetching transactions:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  const formatValue = (value) => {
    const etherValue = ethers.utils.formatUnits(value, 'ether');
    return parseFloat(etherValue).toFixed(5);
  };

  const formatAddress = (address) => {
    if (address.length <= 10) {
      return address;
    } else {
      const firstFive = address.slice(0, 5);
      const lastFive = address.slice(-5);
      return `${firstFive}....${lastFive}`;
    }
  };

  const formatTransactionHash = (hash) => {
    if (hash.length <= 10) {
      return hash; 
    } else {
      const firstFive = hash.slice(0, 5);
      const lastFive = hash.slice(-5);
      return `${firstFive}....${lastFive}`;
    }
  };

  return (
    <div>
      <h2>Latest Transactions</h2>
      <div className="transaction-cards">
        {transactions.map(transaction => (
          <div key={transaction.hash} className="transaction-card mt-5">
            <h4>Transaction Hash: {formatTransactionHash(transaction.hash)}</h4>
            <p>From: {formatAddress(transaction.from)}</p>
            <p>To: {formatAddress(transaction.to)}</p>
            <p>Value: {formatValue(transaction.value)} ETH</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
