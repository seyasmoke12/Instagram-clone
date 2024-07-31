import { auth, firestore } from '../firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { collection, doc,getDocs,query,setDoc, where } from 'firebase/firestore';

import useAuthStore from "../store/authStore"
import showToastAlradiy from "./useShowToast"
import useShowToast from './toosts';


function useSignUpWithEmailAndPassword() {

    const loginUser = useAuthStore((state) => state.login)
    const logoutUser = useAuthStore((state) => state.logout)

    const show = useShowToast()
    
    const [
    createUserWithEmailAndPassword,
    ,
    loading,
    error,
] = useCreateUserWithEmailAndPassword(auth);



const signup  = async (inputs)=>{
    if(!inputs.username || !inputs.fullName || !inputs.email || !inputs.password){
        show("Error", "Please fill all the fields", "error");
    return 
}

const usersRef = collection(firestore, "users");

const q = query(usersRef, where("username", "==", inputs.username));
const querySnapshot = await getDocs(q)
if(!querySnapshot.empty){
    // alert foe existing
    show("Error", "Username already exists", "error");
    return
}

try {
    const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password)
    if(!newUser && error ){
        show("Error", error.message, "error");
        return
    }
    if(newUser){
        const userDoc = {
            uid:newUser.user.uid,
            email:inputs.email,
            username:inputs.username,
            fullName:inputs.fullName,
            bio:"",
            profilePicURL:"",
            followers:[],
            following:[],
            posts:[],
            createdAt:Date.now()
        }
        loginUser(userDoc)
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc))
    }
} catch (error) {
    show("Error", error.message, "error")
}
}
return{loading,signup,error}
}

export default useSignUpWithEmailAndPassword

