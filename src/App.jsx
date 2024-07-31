import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, Route, Routes } from "react-router-dom"
import { auth } from "./firebase/firebase"
import PageLayout from "./Layouts/PageLayout/PageLayout"
import AuthPage from "./Pages/AuthPage/AuthPage"
import HomePage from "./Pages/HomePage/HomePage"
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import useAuthStore from "./store/authStore"



function App() {
  const [authUser, loading] = useAuthState(auth);
  // const authUser = useAuthStore(state => state.user)

// instageram clone, ai generater or google gemini api netflix clone amazone website clone

  return (
    <PageLayout>
    <Routes>
      <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/auth" />}/>
      <Route path="/auth" element={!authUser ? <AuthPage/> : <Navigate to="/" />}/>
      <Route path="/:username" element={<ProfilePage/>}/>
    </Routes>
    </PageLayout>
  )
}


export default App
