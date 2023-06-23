import React from "react";
import {
  chakra,
  Box,
  Stack,
  Flex,
  Button,
  Heading,
  Image,
  Divider,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../App.css";

import "@fontsource-variable/readex-pro";
import "@fontsource/crete-round";
import TradePage from "./TradePage";
import Markets from "./markets";

export default function GetStarted() {
  return (
    <>
      <Flex
        flexDirection={["column"]}
        alignItems={["center"]}
        justifyContent="center"
        h={"auto"}
        color="white"
        p={[8, 16]}
      >
        <Stack spacing={4} alignItems={["center"]}>
          <Box textAlign={["center"]}>
            <Heading
              as="h4"
              fontSize={["md", "xl"]}
              fontFamily="Readex Pro Variable"
              mb={4}
            >
              CRYPTOCURRENCY PLATFORM
            </Heading>
            <Heading
              as="h1"
              fontSize={["2xl", "5xl"]}
              fontFamily="Readex Pro Variable"
              mb={6}
            >
              "Welcome to our cryptocurrency platform"
            </Heading>
            <Heading
              as="h1"
              fontSize={["lg", "2xl"]}
              fontFamily="Readex Pro Variable"
              mb={10}
            >
              where innovation meets financial freedom.
            </Heading>
            <Link to="/signup">
              <Button
                size={["md", "lg"  ]}
                colorScheme="yellow"
                fontFamily="Readex Pro Variable"
                rounded="full"
                _hover={{ opacity: 0.8 , transform: "scale(1.1)"}}
              >
                Get Started
              </Button>
            </Link>
          </Box>

          <Flex
            justifyContent="center"
            alignItems="center"
            mt="5rem"
            fontSize={["1.5rem", "2rem", "2.5rem"]}
            fontFamily="Readex Pro Variable"
          >
            <Box
              flex="1"
              w={["20vh", "30vh", "60vh", "80vh"]}
              mx="5"
              borderBottom="1px solid white"
            />
            <Text margin="0 1rem">Main Goals</Text>
            <Box flex="1" mx="5" borderBottom="1px solid white" />
          </Flex>

          <Stack 
          
            direction={["column", "row"]}
            spacing={[4, 16, 40]}
            alignItems="center"
            margin={["auto", "auto", "2rem"]}
            marginTop={["2rem", "2rem", "6rem"]}
          >
            <Box >
              <Flex direction={"column"} justifyContent={"center"} alignItems={'center'}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/871/871645.png"
                  width={["60px", "100px"]}
                  height={["60px", "100px"]}
                />
                <Heading
                  as="h1"
                  fontSize={["lg", "xl",'3xl']}
                  fontFamily="Readex Pro Variable"
                  mt={3}
                >
                  Security
                </Heading>
              </Flex>
            </Box>
            <Flex  direction={"column"} justifyContent={"center"} alignItems={'center'}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2229/2229638.png"
                width={["60px", "100px"]}
                height={["60px", "100px"]}
              />
              <Heading
                as="h1"
                fontSize={["lg", "xl",'3xl']}
                fontFamily="Readex Pro Variable"
                mt={3}
              >
                Low Fees
              </Heading>
            </Flex>

            <Flex direction={"column"} justifyContent={"center"} alignItems={'center'}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/10635/10635178.png"
                width={["60px", "100px"]}
                height={["60px", "100px"]}
                alt="Reliability"
              />
              <Heading
                as="h1"
                fontSize={["lg", "xl",'3xl']}
                fontFamily="Readex Pro Variable"
                mt={3}
              >
                Reliability
              </Heading>
            </Flex>
          </Stack>
        </Stack>

        <Box flex={1} display={["none", "block"]} mx={[0, 16]}>
          <hr style={{ border: "none", borderBottom: "1px solid white" }} />
        </Box>
   
      </Flex> 
      <TradePage />
      <Markets />

    </>
  );
}
