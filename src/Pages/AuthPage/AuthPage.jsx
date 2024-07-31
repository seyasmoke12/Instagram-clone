import { Container ,Flex } from '@chakra-ui/react'
import { Box, Image } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import AuthForm from "../../components/AuthForm/AuthForm"


function AuthPage() {
  return (
    <Flex minH={"100VH"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"container.md"} padding={0}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                {/* left hand side */}
            <Box display={{base:"none",md:"block"}}>
                {/* <Image src="/auth.png" h={650} alt="phone image"/> */}
                <Image src="/bac.png" h={550} alt="phone image"/>
            </Box>

            {/* Right side hand */}
            <VStack spacing={4} align={"stretch"}>
                <AuthForm/>
                <Box textAlign={"center"}>
                    get the app
                </Box>
                <Flex gap={5} justifyContent={"center"}>
                    <Image src="/playstore.png" h={10} alt="playstore logo"/>
                    <Image src="/microsoft.png" h={10} alt="microsoft logo"/>
                </Flex>
            </VStack>
            </Flex>
            
            
        </Container>
    </Flex>
  )
}

export default AuthPage