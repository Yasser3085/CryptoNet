import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Flex } from '@chakra-ui/react';
import Transactions from './Transactions';
export default function TradePage() {
  const [addressTo, setAddressTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [connectedAddress, setConnectedAddress] = useState('');

  const handleConnect = async () => {
    // Request access to the MetaMask wallet
    if (window.ethereum) {
      try {
        await window.ethereum.enable();

        // Get the connected address
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const connectedAddress = await signer.getAddress();

        setConnectedAddress(connectedAddress);
        console.log('Connected to MetaMask wallet');
      } catch (error) {
        console.error('Error connecting to MetaMask wallet:', error);
      }
    } else {
      console.error('MetaMask wallet not found');
    }
  };

  const handleDisconnect = () => {
    if (window.ethereum) {
      window.ethereum.disconnect();
      setConnectedAddress('');
      console.log('Disconnected from MetaMask wallet');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Connect to the MetaMask provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Get the user's Ethereum address
      const addressFrom = await signer.getAddress();

      // Create a new transaction
      const transaction = {
        to: addressTo,
        value: ethers.utils.parseEther(amount),
        data: ethers.utils.toUtf8Bytes(message),
      };

      // Sign and send the transaction
      const tx = await signer.sendTransaction(transaction);
      console.log('Transaction sent:', tx);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <>
      <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} className='parent' h={'100%'} >
        <div className="container p-5 w-50 trade-div" style={{ margin: '10rem', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <h2>Trade Page</h2>

          {connectedAddress ? (
            <>
              <button className="btn btn-success mr-2" disabled>
                {connectedAddress.substring(connectedAddress.length - 7)}
              </button>
              <button className="btn btn-danger" onClick={handleDisconnect}>
                Disconnect
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleConnect}>
              Connect with MetaMask
            </button>
          )}

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="addressTo" className="form-label">
                Address To:
              </label>
              <input
                type="text"
                id="addressTo"
                className="form-control"
                value={addressTo}
                onChange={(e) => setAddressTo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount of Ethereum:
              </label>
              <input
                type="text"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message:
              </label>
              <input
                type="text"
                id="message"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Ethereum
            </button>
          </form>  

         
        </div>
       <Transactions/>
      </Flex>
    </>
  );
}
