import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth';



type PrivateRouteProps={
    children: React.ReactNode;
    defineRole: string[]
}

const PrivateRoute = ({children,defineRole}: PrivateRouteProps) => {
  
    const navigate= useNavigate();
   const {isAuthenticated, user, userRole}=useAuth();
   console.log("userRole",userRole);
   
     if(!user){
        navigate('/')
     }
     else if( defineRole.includes('patient')){
        navigate('/appointments')
     }
     console.log("user1111", userRole);
     
   console.log("isdddd",isAuthenticated,)
  return children;
}

export default PrivateRoute