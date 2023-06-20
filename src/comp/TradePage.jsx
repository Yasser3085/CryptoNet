import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Flex, Button } from '@chakra-ui/react';
import Transactions from './Transactions';
import '../payment.css';
import '../card.css';
import '@fontsource-variable/readex-pro';
import '../App.css';

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
      <div className="container d-flex justify-content-center align-items-center w-50" style={{ marginTop: '5rem', fontSize: '3.5rem', flexDirection: 'column', fontFamily: 'Readex Pro Variable' }}>
        <p className="title">Send crypto across the world</p>
        <p style={{ fontSize: '1.5rem' }}>Explore the exciting world of cryptocurrencies and participate in the future of finance with CryptoNet</p>
      </div>
      <div style={{ height: '40rem', width: '100%', padding: '20rem' }} className="d-flex parent-div justify-content-between align-items-center">
        <div>
          <div className="container main-wallet">
            <div className="box d-flex justify-content-center">
              <span className="title my-5">YOUR WALLET</span>
              <div>
                <strong>
                  {connectedAddress ? `${connectedAddress.slice(0, 6)}......${connectedAddress.slice(-9)}` : 'Not connected'}
                </strong>
                <Flex alignItems={'center'}>
                  <p>Address Connected</p>
                  {connectedAddress && <span className="dot" />}
                </Flex>
              </div>
            </div>
          </div>
        </div>
        <div className="modal1">
          <form className="form" onSubmit={handleSubmit}>
            <div className="payment--options">
              {connectedAddress ? (
                <Button ml={5} onClick={handleDisconnect}>
                  Disconnect
                </Button>
              ) : (
                <Button ml={5} rightIcon={<img srcset="https://img.icons8.com/?size=2x&amp;id=Oi106YG9IoLv&amp;format=png 2x, https://img.icons8.com/?size=1x&amp;id=Oi106YG9IoLv&amp;format=png 1x" src="https://img.icons8.com/?size=2x&amp;id=Oi106YG9IoLv&amp;format=png 2x" alt="metamask icon" width="30" height="30"></img>} onClick={handleConnect}>
                  Connect with MetaMask
                </Button>
              )}
            </div>
            <div className="separator">
              <hr className="line" />
              <p> Fill The Information</p>
              <hr className="line" />
            </div>
            <div className="credit-card-info--form">
              <div className="input_container">
                <label htmlFor="card_holder_name" className="input_label">
                  Wallet Address
                </label>
                <input
                  className="input_field"
                  type="text"
                  value={addressTo}
                  onChange={(e) => setAddressTo(e.target.value)}
                  placeholder="Enter Recipient Address"
                />
              </div>
              <div className="input_container">
                <label className="input_label">Amount</label>
                <input
                  className="input_field"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount(ETH)"
                />
              </div>
              <div className="input_container">
                <label className="input_label">Message</label>
                <div className="split">
                  <input
                    className="input_field"
                    type="text"
                    name="expiry_date"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter Message"
                  />
                  <input className="input_field" type="text" placeholder="Keyword" />
                </div>
              </div>
            </div>
            <button className="purchase--btn" type="submit">
              Checkout
            </button>
          </form>
        </div>
      </div>
      {connectedAddress && (
        <>
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '5rem', fontSize: '3rem', fontFamily: 'Readex Pro Variable' }}>
  <div className="line mx-5" style={{ flex: 1 }}>
    <hr />
  </div>
  <span style={{ margin: '0 1rem' }}>Latest Transactions</span>
  <div className="line mx-5" style={{ flex: 3 }}>
    <hr />
  </div>
</div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '100%', margin: '5rem' }}>
            <Transactions connectedAddress={connectedAddress} />
          </div>
        </>
      )}
    </>
  );
}
