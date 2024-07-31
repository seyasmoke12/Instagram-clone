import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import { firestore, storage } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './toosts';

function useEditProfile() {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser); 
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile); 
    const show = useShowToast()

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !authUser) return; 
        setIsUpdating(true);
        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        let URL = "";
        const userDocRef = doc(firestore, "users", authUser.uid);

        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(storageRef);
            }

            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL,
            };

            await updateDoc(userDocRef, updatedUser);

            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser); 
            show("Success", "Profile updated successfully", "success");
        } catch (error) {
            show("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    return { editProfile, isUpdating };
}

export default useEditProfile;
