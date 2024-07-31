import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase"
import useAuthStore from '../store/authStore';
import useShowToast from './toosts';
function useLogout() {

    const [signOut, isLogingOut, error] = useSignOut(auth);
    const logoutUser = useAuthStore((state) => state.logout)
    const show = useShowToast()
    const handleLogout = async ()=>{

        try {
            await signOut()
            localStorage.removeItem("user-info")
            logoutUser()
            
        } catch (error) {
            show("Error", error.message, "error");
        }
    }


return {handleLogout, isLogingOut, error}
}

export default useLogout