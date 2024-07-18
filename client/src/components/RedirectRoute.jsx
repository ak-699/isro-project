import React, { useContext } from 'react'
import AuthContext from '../contexts/Auth/AuthContext'
import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ children }) => {
    const {user, isAuthenticated } = useContext(AuthContext);
    const redirect = `/${user?.username}`
    console.log("redirect component")
    if (isAuthenticated) {
        console.log("Redirecting route")
        return <Navigate to={redirect} />
    }
    return children;
    
}

export default RedirectRoute
