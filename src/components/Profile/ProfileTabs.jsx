import { Box, Flex, Text } from "@chakra-ui/react"
import { BsFillPostcardFill } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";

function ProfileTabs() {
return (
    <Flex
    w={"full"}
    justifyContent={"center"}
    gap={{base:4,sm:10}}
    textTransform={"uppercase"}
    fontWeight={"bold"}
    >
        <Flex borderTop={'1px solid white'} alignItems={"center"} gap={1} p="3" cursor={"pointer"}>
            <Box fontSize={20}>
                <BsFillPostcardFill/>
            </Box>
            <Text fontSize={12} display={{base:"none",sm:'block'}}>Posts</Text>
        </Flex>
        
        <Flex alignItems={"center"} gap={1} p="3" cursor={"pointer"}>
            <Box fontSize={20}>
                <MdSaveAlt fontWeight={'bold'}  size={23}/>
            </Box>
            <Text fontSize={12} display={{base:"none",sm:'block'}}>Saved</Text>
        </Flex>

        <Flex  alignItems={"center"} gap={1} p="3" cursor={"pointer"}>
            <Box fontSize={20}>
                <FaRegHeart />
            </Box>
            <Text fontSize={12} display={{base:"none",sm:'block'}}>Likes</Text>
        </Flex>
    </Flex>
)
}

export default ProfileTabs