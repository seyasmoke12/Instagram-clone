import { Image } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import useGetUserProfileById from "../../hooks/useUserProfileByid";
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import {FadeLoader } from "react-spinners"

function FeedPost({post}) {

  const { userProfile } = useGetUserProfileById(post.createdBy);


  return (
    <>
    <PostHeader  post={post} creatorProfile={userProfile}/>
    <Box my={2}
    borderRadius={10}
    overflow={"hidden"}
    >
    <Image src={post?.imageURL} alt={"feed post img"} w={"100%"} h={"100%"} borderRadius={10} />
        
    </Box>
    <PostFooter post={post} creatorProfile={userProfile}/>

    </>
  )
}

export default FeedPost