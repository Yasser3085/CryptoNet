import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
} from "@chakra-ui/react";
import "@fontsource-variable/readex-pro";
import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <FaEthereum color="#FAEF88" size={35} />
          <Text
            as="h1"
            fontSize="3xl"
            fontFamily="Viga"
            borderLeft="1px solid white"
            className="ms-2"
          >
            CryptoNet
          </Text>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
            <Flex
              marginRight={["8rem","10","25rem"]}
              fontFamily="Readex Pro Variable" 
              style={{  fontSize: "20px" }}
              alignItems={'center'}
            >
              {isLoggedIn && (
                <li className="nav-item ">
                  <Link    to="/trade" className="nav-link text-white m-1">
                    Trade 
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item ">
                  <Link to="/markets" className="nav-link text-white m-1">
                    Markets
                  </Link>
                </li>
              )}
            </Flex>

            {isLoggedIn ? (
              <li className="nav-item d-flex align-items-center">
                <Text
                  fontFamily="Readex Pro Variable"
                  as="span"
                  color="white"
                  fontWeight="bold"
                  mr={2}
                >
                  Hi, {username.toUpperCase()}
                </Text>
                <Button
                  leftIcon={<FiLogOut />}
                  className="rounded-pill"
                  colorScheme="gray"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </li>
            ) : (
              <li className="nav-item d-flex align-items-center">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/signup">
                  <Button
                    as="a"
                    colorScheme="yellow"
                    className="rounded-pill ms-3"
                  >
                    Sign Up
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
