import React from 'react'
import { useSelector } from 'react-redux'
import SignIn from './SignIn'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    return isAuthenticated ? (
        <>
            {children}
        </>
    ) : <Navigate to='/signin' />;
}
