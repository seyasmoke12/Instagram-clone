import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
import {Link as RouterLink} from "react-router-dom"
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers"





function SuggestedUsers() {

    const {isLoading,suggestedUsers} = useGetSuggestedUsers()

if(isLoading) return null





return (
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader/>
        {suggestedUsers.length !== 0 && (
            <Flex
        alignItems={"center"} justifyContent={"space-between"} w={"full"}
        >
            <Text fontSize={12} fontWeight={"bold"} color={"gray"}>
                suggested for you
            </Text>
            <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray"}} cursor={"pointer"}>
                See All
            </Text>
        </Flex>
        )}
        {/* {SuggestedUsers.map((user)=>(
            <SuggestedUser user={user} key={user.uid} />
        ))} */}
        {suggestedUsers.map((user) => (
                <SuggestedUser user={user} key={user.uid} />
            ))}
        <Box
        fontSize={12} color={'gray.500'} mt={5}
        alignSelf={"start"}
        display={"column"} alignItems={"center"} justifyContent={"center"} 
        >
            © 2024 built by <Link as={RouterLink} target={"blank"} fontSize={14} color={"blue.500"}>Seid Abdela<br /></Link> <Link color={"blue.500"} as={RouterLink}><span style={{ fontWeight: 'bold', color: 'gray' }}>Email:</span> seyasmoke49@gmail.com </Link><br/> <Link  color={"blue.500"} as={RouterLink}><span style={{ fontWeight: 'bold', color: 'gray' }}>Phone:</span> 0923797665</Link>
        </Box>
    </VStack>
)
}

export default SuggestedUsers