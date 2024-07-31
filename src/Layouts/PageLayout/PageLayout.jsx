import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { auth } from "../../firebase/firebase";

function PageLayout({ children }) {
    const {pathname} = useLocation();
    const [user, loading] = useAuthState(auth);
    const CanRenderSidebar = pathname !== "/auth" && user;
    const canRenderVavebar = !user && !loading && pathname !== "/auth"

    const chackingUserAuth =!user && loading
    if(chackingUserAuth) return <PageLayoutSpinners />
return (
    <Flex flexDir={canRenderVavebar ? 'column' : 'row'}>
        {/* side bar on the left */}
        {CanRenderSidebar ? 
        (<Box w={{base:"70px",md:"240px"}}>
            <Sidebar/>
        </Box>):null
    }
    {canRenderVavebar ? <Navbar /> : null}
        {/* the page content on the right */}
        <Box flex={1} w={{base: "calc(100% - 70px)", md:"calc(100% - 240px)" }} mx={"auto"}>
            {children}
        </Box>
    </Flex>
)
}

export default PageLayout

const PageLayoutSpinners = ()=>{
    return(
        <Flex flexDir={"column"} h="100vh" alignItems="center" justifyContent="center">
            <Spinner size="xl" />
        </Flex>
    )
}