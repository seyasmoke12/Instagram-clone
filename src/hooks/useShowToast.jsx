import { useToast } from '@chakra-ui/react'
import React from 'react'

function useShowToast() {

    const toast = useToast()


    const showToast = (title,description,status)=>{
        toast({
        title: 'Error',
        description: "Please fill all the required",
        status: 'error',
        duration: 3000,
        isClosable: true,
        })
    }

return showToast
}

export default useShowToast
