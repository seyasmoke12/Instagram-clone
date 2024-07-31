import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react"
import {Link } from "react-router-dom"

import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
function SuggestedHeader() {

  const { handleLogout,isLogingOut} = useLogout()
  const authUser = useAuthStore((state) => state.user)


  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
          {
            authUser ? <Link to={`${authUser.username}`}>
            <Avatar size={"lg"} src={authUser.profilePicURL} />
            </Link>: null
          }
            {
              authUser ? 
              <Link to={`${authUser.username}`}>
            <Text
            fontSize={12}
            fontWeight={"bold"}
            >
                {
                  authUser.username
                }
            </Text>
            </Link>
            :
            null
            }
        </Flex>
        <Button
        size={"xs"}
        background={"transparent"}
        _hover={{background:"whiteAlpha.300"}}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        isloading={isLogingOut}
        onClick={handleLogout}
        cursor={"pointer"}
        
        >
            Log Out
        </Button>
    </Flex>
  )
}

export default SuggestedHeader