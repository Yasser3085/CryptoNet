import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Box, Flex, Button } from "@chakra-ui/react";
import Transactions from "./Transactions";
import "../payment.css";
import "../card.css";
import "@fontsource-variable/readex-pro";
import "../App.css";
import Swal from "sweetalert2";
const ETHER_TO_RIYALS_RATE = 70;
export default function TradePage() {
  const [addressTo, setAddressTo] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [connectedAddress, setConnectedAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [balanceInRiyals, setBalanceInRiyals] = useState("");

  useEffect(() => {
    fetchAccountBalance();
  }, [connectedAddress]);

  const fetchAccountBalance = async () => {
    if (connectedAddress) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(connectedAddress);
        const balanceInEther = ethers.utils.formatEther(balance);
        calculateBalanceInRiyals(balance.toString());
        setAccountBalance(balanceInEther);
      } catch (error) {
        console.error("Error fetching account balance:", error);
      }
    }
  };

  const calculateBalanceInRiyals = (balanceInEth) => {
    const balanceInWei = ethers.utils.parseEther(balanceInEth);
    const balanceInRiyals = balanceInWei.mul(ETHER_TO_RIYALS_RATE).toString();
    setBalanceInRiyals(balanceInRiyals);
  };

  function formatNumber(number) {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return parts.join(".");
  }

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
        console.log("Connected to MetaMask wallet");
      } catch (error) {
        console.error("Error connecting to MetaMask wallet:", error);
      }
    } else {
      console.error("MetaMask wallet not found");
    }
  };

  const handleDisconnect = () => {
    Swal.fire(
      "Info",
      "To disconnect, please click on the MetaMask extension and choose the 'Disconnect' option.",
      "info"
    );
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
      console.log("Transaction sent:", tx);

      // Show success message using Swal
      Swal.fire("Success", "Transaction Confirmed", "success");
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <>
      <Box
        className="container d-flex justify-content-center align-items-center "
        width={["100%","39%"]}
        marginTop={["2rem", "5rem"]}
        fontSize={["2rem", "3.5rem"]}
        flexDirection="column"
        fontFamily="Readex Pro Variable"
      >
        <p className="title">Send crypto across the world</p>
        <p style={{ fontSize: "1.5rem" }}>
          Explore the exciting world of cryptocurrencies and participate in the
          future of finance with CryptoNet
        </p>
      </Box>

      <Flex
        height={["auto", "40rem"]}
        width="100%"
        padding={["2rem", "0rem", "2rem", "5rem", "18rem"]}
        justifyContent="space-between"
        alignItems="center"
        flexDirection={["column", "row"]}
        className="parent-div"
      >
        <Box marginBottom={["2rem", 0]}>
          <div className="container main-wallet">
            <div className="box d-flex ">
              <span className="title mt-5 ">YOUR WALLET</span>
              <div style={{marginBottom:'4rem'}}>
                {connectedAddress ? (
                  <>
                  <Flex mb={'5rem'} alignItems="center">
                      <p>Address Connected</p>
                      <span className="dot" />
                    </Flex>
                    <strong>
                      {`${connectedAddress.slice(
                        0,
                        6
                      )}......${connectedAddress.slice(-9)}`}
                    </strong>
                    
                    <p style={{fontSize:'1.2rem'}}>
                      Balance:{" "}
                      {accountBalance
                        ? `${accountBalance.slice(0, 6)} ETH`
                        : "Loading..."}
                    </p>

                    <div>
                      <strong></strong>{" "}
                      {accountBalance ? (
                        <>
                          <span style={{fontSize:'1.2rem'}}> 
                            {" "}
                            Balance in SAR :
                            {" "}
                            {balanceInRiyals 
                              ? formatNumber(balanceInRiyals.slice(0, 4))
                              : "Loading..."}
                          </span>{" "}
                          <span>SAR</span>
                        </>
                      ) : (
                        "Loading..."
                      )}
                    </div>
                  </>
                ) : (
                  <p>Not connected</p>
                )}
              </div>
            </div>
          </div>
        </Box>
        <Box className="modal1">
          <form className="form " onSubmit={handleSubmit}>
            <div className="payment--options">
              {connectedAddress ? (
                <Button ml={5} onClick={handleDisconnect}>
                  Disconnect
                </Button>
              ) : (
                <Button
                  ml={5}
                  rightIcon={
                    <img
                      srcSet="https://img.icons8.com/?size=2x&amp;id=Oi106YG9IoLv&amp;format=png 2x, https://img.icons8.com/?size=1x&amp;id=Oi106YG9IoLv&amp;format=png 1x"
                      src="https://img.icons8.com/?size=2x&amp;id=Oi106YG9IoLv&amp;format=png 2x"
                      alt="metamask icon"
                      width="30"
                      height="30"
                    ></img>
                  }
                  onClick={handleConnect}
                >
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
                  <input
                    className="input_field"
                    type="text"
                    placeholder="Keyword"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="purchase--btn"
              type="submit"
            >
              Checkout
            </button>
          </form>
        </Box>
      </Flex>
      {connectedAddress && (
        <>
          <Flex
            justifyContent="center"
            alignItems="center"
            marginTop={["2rem", "5rem"]}
            fontSize="3rem"
            fontFamily="Readex Pro Variable"
          >
            <Box className="line mx-5" flex={1}>
              <hr />
            </Box>
            <span style={{ margin: "0 1rem" }}>Latest Transactions</span>
            <Box className="line mx-5" flex={3}>
              <hr />
            </Box>
          </Flex>
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            height="100%"
            margin="5rem"
          >
            <Transactions connectedAddress={connectedAddress} />
          </Flex>
        </>
      )}
    </>
  );
}
