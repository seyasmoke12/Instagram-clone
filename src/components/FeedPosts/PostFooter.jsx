import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiDislike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { Text } from '@chakra-ui/react';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import usePostComment from '../../hooks/usePostComment';
import useAuthStore from '../../store/authStore';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from '../../utils/timeAgo';
import CommentsModal from '../Modals/CommentsModal';





function PostFooter({post,username,isProfilePage,creatorProfile}) {

    
    const { isCommenting, handlePostComment } = usePostComment();
    const [comment, setComment] = useState("");
    const authUser = useAuthStore((state) => state.user);
    const commentRef = useRef(null);


    const { handleLikePost, isLiked, likes } = useLikePost(post);
    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleSubmitComment = async () => {
		await handlePostComment(post.id, comment);
		setComment("");
	};




return (
<Box mb={10} marginTop={'auto'}>
    <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
    <Box onClick={handleLikePost}
    cursor={"pointer"}
    fontSize={18}
    >
        {
            !isLiked ? <FaRegHeart size={25} /> : < FcLike size={25}/>
        }
    </Box>

    <Box cursor={'pointer'} fontSize={18} onClick={() => commentRef.current.focus()}>
        <FaRegCommentDots size={25}/>
    </Box>
    </Flex>
    <Text fontWeight={600} fontSize='sm'>
        {likes} likes
    </Text>
    {isProfilePage && (
				<Text fontSize='12' color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}
    {!isProfilePage && (
        <>
        <Text fontSize="sm" fontWeight={700}>
        {creatorProfile?.username}_{' '}
        <Text as="span"
        fontWeight={400}
        >
        {post?.caption}
        </Text>
        </Text>
        {post?.comments.length > 0 && (
            <Text fontSize="sm" color={"gray"} cursor={'pointer'} onClick={onOpen}>
            View all {post?.comments.length} comments
        </Text>
        )}
        {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null }
    </>
    )}
    {authUser && (
        <Flex
    alignItems={"center"}
    gap={2}
    justifyContent={"space-between"}
    w={"full"}
    >
        <InputGroup>
        <Input variant={"flushed"} 
        placeholder={"Add a comment..."} 
        value={comment}
        ref={commentRef}
        fontSize={14} 
        onChange={(e) => setComment(e.target.value)} />
            <InputRightElement>
            <Button
            fontSize={14}
            color={"blue.500"}
            fontWeight={6000}
            cursor={"pointer"}
            _hover={{color:"white"}}
            bg={"transparent"}
            onClick={handleSubmitComment}
            isLoading={isCommenting}
            >
            post
            </Button>
            </InputRightElement>
        </InputGroup>
    </Flex>
    )}
    </Box>
)
}

export default PostFooter