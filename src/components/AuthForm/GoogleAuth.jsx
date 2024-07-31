import { Flex, Image, Text } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";

function GoogleAuth({ prefix }) {
    const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
    const loginUser = useAuthStore((state) => state.login);

    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();
            if (!newUser && error) {
                console.log(error);
                return;
            }
            const userRef = doc(firestore,"users",newUser.user.uid)
            const userSnap = await getDoc(userRef)
            if (userSnap.exists()) {
                const userDoc = userSnap.data()
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                loginUser(userDoc)
            }else{
                // else it will sign up
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    bio: "",
                    profilePicURL: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
            <Image src="/google.png" w={5} alt="google logo" />
            <Text mx={'2'} color={"blue.500"}>
                {prefix} with Google
            </Text>
        </Flex>
    );
}

export default GoogleAuth;
