import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./toosts";



function useLogin() {
const showTost = useShowToast()
    const [
  signInWithEmailAndPassword,
  user
  ,
  loading,
  error,
] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login)
    const show = useShowToast()
const login = async (inputs)=>{
    if(!inputs.email || !inputs.password){
            show("Error", "Please fill all the fields", "error");
        }
    try {
        const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
        if(userCred){
            const docRef = doc(firestore, "users", userCred.user.uid);
            const docSnap = await getDoc(docRef);
            localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
            loginUser(docSnap.data())
        }
    } catch (error) {
    show("Error", error.message, "error");
    }
}
    return {loading,error,login}
}
export default useLogin