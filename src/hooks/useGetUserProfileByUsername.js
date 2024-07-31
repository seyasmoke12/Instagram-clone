import { collection, getDoc,getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase'
import useUserProfileStore from '../store/userProfileStore'
import useShowToast from './toosts'

function useGetUserProfileByUsername(username) {
    const [isLoading,setIsLoding] = useState(true)
    const show = useShowToast()
    const {userProfile,setUserProfile} = useUserProfileStore()

useEffect(() => {
    const getUserProfile = async() =>{
        setIsLoding(true)
        
        
        try {
            const q = query(collection(firestore,"users"),where('username',"==",username))
            const querySnapshot = await getDocs(q)
            if(querySnapshot.empty) return setUserProfile(null)

let userDoc
        querySnapshot.forEach((doc)=>{
            userDoc = doc.data()
        });
setUserProfile(userDoc)
console.log(userDoc)
        } catch (error) {
            show("Error", error.message, "error");
        }finally{
            setIsLoding(false)
        }
    }
    getUserProfile()
},[setUserProfile , username,show])
return {isLoading,userProfile}
}

export default useGetUserProfileByUsername