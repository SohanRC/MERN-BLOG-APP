import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function AdminPrivateRoute({ children }) {
    const user = useSelector((state) => state.user.userData)
    return user.isAdmin ? (
        <>
            {children}
        </>
    ) : <Navigate to='/signin' />;
}
