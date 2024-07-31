import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useShowToast from "./toosts";

const useGetUserProfileById = (userId) => {
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState(null);

	const show = useShowToast();

	useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
			setUserProfile(null);
			try {
				const userRef = await getDoc(doc(firestore, "users", userId));
				if (userRef.exists()) {
					setUserProfile(userRef.data());
				}
			} catch (error) {
				show("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};
		getUserProfile();
	}, [show, setUserProfile, userId]); //showthost

	return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;