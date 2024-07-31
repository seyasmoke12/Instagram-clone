import { Button, Container, Flex, Image, } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <Container maxW={"container.lg"} my={4}>
      <Flex w={"full"} justifyContent={{ base: "center", sm: "space-between" }} alignItems={"center"}>
        <Image src="/logo.jpg" h={20} display={{ base: "none", sm: "block" }} cursor={"pointer"} />
        <Flex gap={4}>
          <Link to="/auth">
            <Button m={2} colorScheme={"blue"} size={"sm"}>
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button m={2} variant={"outline"} size={"sm"}>
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Navbar