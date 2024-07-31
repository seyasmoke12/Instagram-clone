import { Alert, AlertIcon, Button, Image, Input } from "@chakra-ui/react"
import { useState } from "react"
import useLogin from "../../hooks/useLogin"


function Login() {



    const[inputs,setInputes] = useState({
        email:"",
        password:"",
    })

    const {loading,error,login} = useLogin()

return (
    <>
    {/* <Image src="/logo.jpg" h={24} cursor={"pointer"} alt='instageram logo'/> */}
            <Input
            value={inputs.email}
            onChange={(e)=>setInputes({...inputs,email:e.target.value})}
            placeholder="Email"
            fontSize={14}
            size={"sm"}
            type="email"
            />
            {
                error && (
                    <Alert status="error" fontSize={13} p={2} borderRadius={4}>
                        <AlertIcon fontSize={12}/>
                        {error.message}
                    </Alert>
                )
            }
            <Input
            value={inputs.password}
            onChange={(e)=>setInputes({...inputs,password:e.target.value})}
            placeholder="Password"
            fontSize={14}
            size={"sm"}
            type="password"
            />
            <Button w={"full"} isLoading={loading} colorScheme={"blue"} size={"sm"} fontSize={14} onClick={()=>login(inputs)}>Log in</Button>
    </>
)
}

export default Login