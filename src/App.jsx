import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register'
import Profile from './Components/Profile/Profile'
import NotFound from './Components/NotFound/NotFound'
import Home from './Components/Home/Home'
import {  AuthContextProvider } from './Context/AuthContext'
import ProtectComponents from './ProtectComponents/ProtectComponents'
import ProtectAuth from './ProtectAuth/ProtectAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetails from './Components/PostDetails/PostDetails'
import { ToastContainer } from 'react-toastify'
import ChangePassword from './Components/ChangePassword/ChangePassword'

const queryClient =new QueryClient()

export default function App() {

 let route = createBrowserRouter([
   {
     path: "",
     element: <Layout />,
     children: [
       { index: true, element:<ProtectAuth> <Login /> </ProtectAuth> },
       { path: "register", element: <ProtectAuth> <Register /> </ProtectAuth>},
       { path: "home", element: <ProtectComponents> <Home/> </ProtectComponents> },
       { path: "ChangePassword", element: <ProtectComponents> <ChangePassword/> </ProtectComponents> },
       { path: "postDetails/:id", element: <ProtectComponents> <PostDetails/> </ProtectComponents> },
       { path: "profile", element: <ProtectComponents> <Profile/> </ProtectComponents> },
       { path: "*", element: <NotFound /> },
     ],
   },
 ]);

  return (
    <QueryClientProvider client={queryClient}>
        <ToastContainer />
      <AuthContextProvider>
        <RouterProvider router={route} />
        <ReactQueryDevtools />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
