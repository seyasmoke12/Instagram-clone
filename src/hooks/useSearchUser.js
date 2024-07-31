import { useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useShowToast from "./toosts";


const useSearchUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const show = useShowToast();
	const getUserProfile = async (username) => {
		setIsLoading(true);
		setUser(null);
		try {
			const q = query(collection(firestore, "users"), where("username", "==", username));
			const querySnapshot = await getDocs(q);
			if (querySnapshot.empty) return show("Error", "User not found", "error");
			querySnapshot.forEach((doc) => {
				setUser(doc.data());
			});
		} catch (error) {
            show("Error", error.message, "error");
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};
	return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;