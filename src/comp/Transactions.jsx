import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FaEthereum } from 'react-icons/fa';
import '../App.css';
function Transactions(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const apiKey = '17USV69F2SB1R3JIFBVGK3J82M5MXF7QHG';
    const address = props.connectedAddress;

    if (address) {
      const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === '1') {
            setTransactions(data.result);
          } else {
            console.error('Error fetching transactions:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error fetching transactions:', error);
        });
    }
  }, [props.connectedAddress]);

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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toDateString();
  };

  return (
    <div className="container sub-wallet gap-5 w-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5rem' }}>
      <div className="transaction-container ">
        {transactions.map((transaction, index) => (
          <div className="box sub-wallet d-flex justify-content-center" key={transaction.hash}>
            <span className="title my-5">{`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Transaction`}</span>
            <div>
              <strong>Transaction Hash: {formatTransactionHash(transaction.hash)}</strong>
              <strong>From: {formatAddress(transaction.from)}</strong>
              <strong>To: {formatAddress(transaction.to)}</strong>
              <strong>Date: {formatDate(transaction.timeStamp)}</strong>
              <strong style={{ display: 'flex', alignItems: 'center' }}>
                Value: {formatValue(transaction.value)} ETH <FaEthereum />
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
