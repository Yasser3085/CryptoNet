import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorSignup, setErrorSignup] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setIsLoggedIn(true);
      setUsername(username);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:9000/login/user", {
        username,
        password,
      });

      console.log(response.data); // Token received from the backend upon successful login

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        setIsLoggedIn(true);
        setShowLoginModal(false);
        navigate("/trade");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response.data;
      setErrorMessage(errorMessage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9000/register/user", {
        username,
        email,
        password,
      });

      console.log(response.data); // The response from the backend
      setShowSignupModal(false); // Close the modal
      setShowLoginModal(true); // Open the login modal
    } catch (error) {
      console.error(error.response.data);
      const errorSignup = error.response.data.message;
      setErrorSignup(errorSignup); // Set the error message

      // Clear the input fields
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg   p-3">
      <div className="container-fluid">
        <Flex justifyContent={"center"} alignItems={"center"}>
          <FaEthereum color="#FAEF88" size={35} _hover={{ color: "#FAEF88" }} />
          <Link
            to="/"
            className="navbar-brand d-flex justify-content-center align-items-center"
          >
            <Text
              as="h1"
              marginBottom={"0"}
              fontSize="3xl"
              fontFamily="Viga"
              borderLeft="1px solid white"
              className="ms-2"
              _hover={{ color: "#FAEF88" }}
            >
              CryptoNet
            </Text>
          </Link>
        </Flex>

        <button
          className="navbar-toggler navbar-dark bordered"
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
              marginRight={["8rem", "10", "25rem"]}
              fontFamily="Readex Pro Variable"
              style={{ fontSize: "20px" }}
              alignItems={"center"}
            >
              {isLoggedIn && (
                <li className="nav-item ">
                  <Link to="/trade" className="nav-link text-white m-1">
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
                <Button
                  mx={3}
                  variant={"unstyled"}
                  onClick={() => setShowLoginModal(true)}
                  _hover={{ color: "white", transform: "scale(1.1)" }}
                  className="nav-link"
                >
                  Login
                </Button>
                <Button
                  colorScheme="yellow"
                  textColor={"black"}
                  rounded={["0px", "full"]}
                  _hover={{ color: "black", transform: "scale(1.1)" }}
                  onClick={() => setShowSignupModal(true)}
                  className="nav-link"
                >
                  Sign Up
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Login Modal */}
      <Modal isOpen={showLoginModal} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                _placeholder={{ color: "white", opacity: "0.5" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                _placeholder={{ color: "white", opacity: "0.5" }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {errorMessage && (
              <Text color="red.500" mt={2}>
                {errorMessage}
              </Text>
            )}
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            <Button colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={showSignupModal} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                _placeholder={{ color: "white", opacity: "0.5" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                _placeholder={{ color: "white", opacity: "0.5" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                _placeholder={{ color: "white", opacity: "0.5" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {errorSignup && (
              <Text color="red.500" mt={2}>
                {errorSignup}
              </Text>
            )}
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            <Button colorScheme="blue" onClick={handleSignup}>
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </nav>
  );
}
