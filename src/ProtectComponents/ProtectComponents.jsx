import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectComponents({children}) {
    if(localStorage.getItem('token')){
        return children
    }else{
        return <Navigate to="/" />;
    }
 
}
