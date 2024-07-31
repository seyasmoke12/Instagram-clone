import { Button, Container } from '@chakra-ui/react'
import { Avatar, Box, Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useFollowUser from '../../hooks/useFollowUser';
import { timeAgo } from '../../utils/timeAgo';


function PostHeader({post, creatorProfile}) {
    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);

return (
    <Flex justifyContent={"space-between"} alignItems={"center"} width={"full"} my={2}>
        <Flex alignItems={"center"} gap={2}>
            <Link to={`/${creatorProfile?.username}`}>
            <Avatar src={creatorProfile?.profilePicURL}  alt='user profile' size={"sm"}/>
            </Link>
            <Flex fontSize={12} fontWeight={'bold'} gap='2'>
                <Link to={`/${creatorProfile?.username}`}>
                {creatorProfile?.username}
                </Link>
                <Box color={"gray.500"}>
                - {timeAgo(post?.createdAt)}
                </Box>
            </Flex>
        </Flex>
        <Button
					size={"xs"}
					bg={"transparent"}
					fontSize={12}
					color={"blue.500"}
					fontWeight={"bold"}
					_hover={{
						color: "white",
					}}
					transition={"0.2s ease-in-out"}
					onClick={handleFollowUser}
					isLoading={isUpdating}
				>
					{isFollowing ? "Unfollow" : "Follow"}
				</Button>
    </Flex>
)
}

export default PostHeader