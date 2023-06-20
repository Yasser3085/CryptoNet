import React from 'react';
import Navbar from './Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import '@fontsource/crete-round';
import '@fontsource/viga';
import '@fontsource-variable/readex-pro';
export default function Home() {
  return (
    <>
      <div className='parent h-100'>
        <div className='mx-5' style={{ fontFamily: 'Readex variable pro '  }}>
          <Row>
            <Col>
              <h1 className="text-center mt-5">Welcome to CryptoNet</h1>
              <p className="lead text-center mt-3">
                Explore the world of cryptocurrency and stay up-to-date with the latest trends and news.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <h2>What is Cryptocurrency?</h2>
              <p>
                Cryptocurrency is a digital or virtual form of currency that uses cryptography for secure financial
                transactions, control the creation of new units, and verify the transfer of assets. It is decentralized
                and operates on a technology called blockchain, which ensures transparency and security.
              </p>
            </Col>
            <Col md={6}>
              <h2>Why Invest in Cryptocurrency?</h2>
              <p>
                Cryptocurrency investments have gained popularity due to their potential for high returns. Some of the key
                reasons to consider investing in cryptocurrencies include:
              </p>
              <ul>
                <li>Opportunity for significant growth</li>
                <li>Diversification of investment portfolio</li>
                <li>Decentralized nature and security</li>
                <li>Emerging technology with various real-world applications</li>
              </ul>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h2>Stay Informed</h2>
              <p>
                To stay updated with the cryptocurrency market, you can follow reliable news sources, join online
                communities, and engage in discussions with fellow enthusiasts. It's essential to research and understand
                the risks associated with investing in cryptocurrencies before making any financial decisions.
              </p>
              <p>Start your journey into the world of cryptocurrency and explore the possibilities it offers.</p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
