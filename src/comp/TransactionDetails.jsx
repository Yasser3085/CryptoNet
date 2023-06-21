import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';

function TransactionDetails() {
  const [transaction, setTransaction] = useState(null);
  const { hash } = useParams();

  useEffect(() => {
    // Fetch transaction details using the transaction hash
    const fetchTransactionDetails = async () => {
      try {
        const apiKey = '17USV69F2SB1R3JIFBVGK3J82M5MXF7QHG';
        const apiUrl = `https://api.etherscan.io/api?module=transaction&action=gettxinfo&txhash=${hash}&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === '1') {
          setTransaction(data.result);
        } else {
          console.error('Error fetching transaction details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };

    fetchTransactionDetails();
  }, [hash]);

  const formatValue = (value) => {
    const etherValue = ethers.utils.formatUnits(value, 'ether');
    return parseFloat(etherValue).toFixed(5);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toDateString();
  };

  if (!transaction) {
    return <div>Loading transaction details...</div>;
  }

  return (
    <div className="container sub-wallet gap-5 w-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5rem' }}>
      <div className="transaction-details-container">
        <h2>Transaction Details</h2>
        <div>
          <strong>Transaction Hash: {transaction.hash}</strong>
          <strong>From: {transaction.from}</strong>
          <strong>To: {transaction.to}</strong>
          <strong>Date: {formatDate(transaction.timeStamp)}</strong>
          <strong>Value: {formatValue(transaction.value)} ETH</strong>
          {/* Add more transaction details here */}
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;
