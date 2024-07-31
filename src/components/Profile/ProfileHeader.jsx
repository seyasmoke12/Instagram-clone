import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, VStack } from "@chakra-ui/react"
import useFollowUser from "../../hooks/useFollowUser"
import useAuthStore from "../../store/authStore"
import useUserProfileStore from '../../store/userProfileStore'
import EditProfile from "./EditProfile"

function ProfileHeader() {
    const {userProfile} = useUserProfileStore()
    const authUser = useAuthStore((state)=> state.user)
    const {isFollowing,isUpdating,handleFollowUser} = useFollowUser(userProfile.uid)
    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
    const { isOpen, onOpen, onClose } = useDisclosure()
return (
    <Flex gap={{base:4,sm:10}} py={10} direction={{base:"column",sm:"row"}}>
        <AvatarGroup
        size={{base:"xl",md:"2xl"}}
        justifySelf={'center'}
        alignSelf={"flex-start"}
        mx={"auto"}
        >
            <Avatar name={userProfile?.username}  src={userProfile?.profilePicURL} alt='user profile' />
        </AvatarGroup>
        <VStack alignItems={"start"}
        gap={2}
        mx={"auto"}
        flex={1}
        >
            {visitingOwnProfileAndAuth && (<Flex gap={4}
            direction={{base:'column',sm:"row"}}
            justifyContent={{base:"center",sm:"flex-start"}}
            alignItems={"center"}
            w={"full"}
            >
                <Text fontSize={{base:'sm',mg:"lg"}}>
                    {userProfile?.username}
                </Text>
                <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={"white"} color={'black'} _hover={{bg:"whiteAlpha.800"}} size={{base:'xs',md:'sm'}} onClick={onOpen}>
                        Edit Profile
                    </Button>
                </Flex>
            </Flex>)}

            {visitingAnotherProfileAndAuth && (<Flex gap={4}
            direction={{base:'column',sm:"row"}}
            justifyContent={{base:"center",sm:"flex-start"}}
            alignItems={"center"}
            w={"full"}
            >
                <Text fontSize={{base:'sm',mg:"lg"}}>
                    {userProfile?.username}
                </Text>
                <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={"blue.500"}
                    color={'whiteAlpha.900'}
                    _hover={{bg:"blue.600"}}
                    size={{base:'xs',md:'sm'}}
                    onClick={handleFollowUser}
                    isLoading={isUpdating}
                    >
                        {isFollowing ? "unfollow" : 'Follow'}
                    </Button>
                </Flex>
            </Flex>)}
            
            <Flex alignItems={"center"} gap={{base:2,sm:4}}>
                <Text fontSize={{base:"xs",md:"sm"}}>
                    <Text as="span" fontWeight={"bold"} mr={1}>{userProfile?.posts.length}</Text>
                    posts
                </Text>
                <Text fontSize={{base:"xs",md:"sm"}}>
                    <Text as="span" fontWeight={"bold"} mr={1}>{userProfile?.followers.length}</Text>
                    followers
                </Text>
                <Text fontSize={{base:"xs",md:"sm"}}>
                    <Text as="span" fontWeight={"bold"} mr={1}>{userProfile?.following.length}</Text>
                    following
                </Text>
            </Flex>
            <Flex alignItems={'center'} gap={4}>
                <Text fontSize={'sm'} fontWeight={'bold'}>{userProfile?.fullName}</Text>
            </Flex>
            <Text fontSize={'sm'}>{userProfile?.bio}</Text>
        </VStack>
        {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
    </Flex>
)
}



export default ProfileHeader

