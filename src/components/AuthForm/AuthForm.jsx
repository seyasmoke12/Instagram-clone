import { Box, Image, VStack } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"
import Login from "./Login"
import Signup from "./Signup"

function AuthForm() {
    const[isLogin,setIsLogin] = useState(true)
    const navigate = useNavigate()
    


    // const handleAuth = ()=>{
    // if (!inputs.email || !inputs.password) {
    //     alert("please fill all the fildes")
    //     return
    // }else{
    //     navigate("/")
    // }
    // }

return (
    <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
            <Image src="/logo.jpg" h={24} cursor={"pointer"} alt='instageram logo'/>
            {
                isLogin ? <Login/> : <Signup/>
            }
        {/*------------- OR------------- text */}
        <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}> OR </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
        </Flex>
        <GoogleAuth prefix={isLogin ? 'Log in' : 'Sign up'}/>
        </VStack>
    </Box>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
            <Box mx={2} fontSize={14}>
                {isLogin ? "Don't have an account" : "Already have an account"}
            </Box>
            <Box onClick={()=>setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                {isLogin ? "Sign up" : "Log in"}
            </Box>
        </Flex>
    </Box>
    </>
)
}

export default AuthForm