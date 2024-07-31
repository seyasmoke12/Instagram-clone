import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react'
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import usePostStore from '../store/postStore';
import useShowToast from './toosts';

function usePostComment() {
    const [isCommenting, setIsCommenting] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const addComment = usePostStore((state) => state.addComment);
    const show = useShowToast()


    const handlePostComment = async (postId, comment) => {
        if (isCommenting) return;
        if (!authUser) return show("Error", "You must be logged in to comment", "error");
        setIsCommenting(true);
        const newComment = {
			comment,
			createdAt: Date.now(),
			createdBy: authUser.uid,
			postId,
		};
        try {
            await updateDoc(doc(firestore, "posts", postId), {
				comments: arrayUnion(newComment),
			});
			addComment(postId, newComment);
        } catch (error) {
            show("Error", error.message, "error");
        }finally {
			setIsCommenting(false);
		}
    }

    return { isCommenting, handlePostComment };

}

export default usePostComment