import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile"
import PostDetiles from "./pages/PostDetiles/PostDetiles"
import Register from "./pages/Register/Register"
import NotFound from "./pages/Notfound/NotFound"
import AuthContextProvider from "./Context/AuthContext"
import ProtectedRoutes from "./componants/ProtectedRoutes/ProtectedRoutes"
import ProtectedLoginRoutes from "./componants/ProtectedRoutes/ProtectedLoginRoutes"
import {QueryClientProvider , QueryClient} from "@tanstack/react-query"
import  { Toaster } from 'react-hot-toast'
import {useNetworkState} from 'react-use'
import Offline from "./componants/Offline/Offline"






const query = new QueryClient()

const routers =createBrowserRouter([
    {
      path:"" , element: <Layout/> , children :[

        {index : true , element: <ProtectedRoutes> <Home/>   </ProtectedRoutes> },
         {path:"home" , element: <ProtectedRoutes>  <Home/></ProtectedRoutes> },
         {path:"postDetiles/:id" , element: <ProtectedRoutes>  <PostDetiles/></ProtectedRoutes> },
        {path:"login" , element: <ProtectedLoginRoutes> <Login /></ProtectedLoginRoutes> },
        {path:"profile" , element: <ProtectedRoutes>   <Profile/></ProtectedRoutes> },
        {path:"register" , element: <ProtectedLoginRoutes> <Register/></ProtectedLoginRoutes> },
        {path:"*" , element: <NotFound/> },

      ]
    }  
  ])


export default function App() {



  const {online} =useNetworkState()
  return (
<>
{!online && <Offline/>}
    <QueryClientProvider client={query}>
    <AuthContextProvider>
      <Toaster/>
      <RouterProvider router={routers}></RouterProvider>
    </AuthContextProvider>
    </QueryClientProvider>
</>
  )
}
