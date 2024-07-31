import { Flex, Text, Button } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import React from 'react'
import {Link as RouterLink} from "react-router-dom"
import { FaInstagram } from "react-icons/fa6";
import { Image } from '@chakra-ui/react'
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { Tooltip } from '@chakra-ui/react'
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../../hooks/useLogout'
import SidebarItems from './Sidebaritems'

function Sidebar() {
    

const {isLogingOut,handleLogout} = useLogout()

return (
    <Box height={"100vh"} borderRight={"1px solid"}
    borderColor={"whiteAlpha.300"}
    py={5}
    position={"sticky"}
    top={0}
    left={0}
    px={{base: 2,md:4}}
    >
    <Flex direction={"column"} gap={10} w="full" height={'full'}>
        <Link to={'/'} as={RouterLink} pl={2} display={{base:"none",md:"block"}} cursor={'pointer'}>
            <Image w={{base:40}} src="/logo.jpg" alt="logoo"/>
            </Link>
            <Link to={'/'} as={RouterLink} pl={2} display={{base:"block",md:"none"}} cursor={'pointer'} 
            borderRadius={6} 
            _hover={{bg:"whiteAlpha.200"}}
            w={{base:10}}
            >
                <FaInstagram size={30} />
            </Link>
            <Flex direction={"column"} gap={5} cursor={"pointer"}>
                <SidebarItems />
            </Flex>
            <Flex>
                {/* LOGOUT */}
                <Tooltip
                    hasArrow
                    label={"Logout"}
                    placement="right"
                    ml={1}
                    openDelay={500}
                    display={{base:"block",md:"none"}}
                    >
                        <Flex
                        onClick={handleLogout}
                        
                        alignItems={"center"}
                        gap={4}
                        _hover={{bg:"whiteAlpha.400"}}
                        borderRadius={6}
                        p={2}
                        w={{base:10,md:'full'}}
                        mt={20}
                        justifyContent={{base:"center",md:"flex-start"}}
                        
                        >
                        <TbLogout2 size={25}/>
                        <Button
                        _hover={{bg:"transparent"}}
                        isLoading={isLogingOut}
                        display={{base:"none",md:"block"}} variant={'ghost'}>Logout</Button>
                        </Flex>
                    </Tooltip>
            </Flex>
    </Flex>
    </Box>
)
}

export default Sidebar