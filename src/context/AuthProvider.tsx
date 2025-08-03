import React, { useCallback, useState,useEffect } from "react";
import type { ReactNode } from "react";
import axiosInstance from "../utils/axios";
import { setSession ,isValidToken} from "../auth/utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import localStorageAvailable from "../utils/localStorageAvailable";

interface AuthProviderProps {
  children: ReactNode;
  // userRole: string | null;
}
interface User {
  email: string;
  password: string;
   full_name:string |null
}

interface LoginCredentials {
  email: string;
  password: string;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userID, setUserId] = useState<string |null>(null);
  const [isInitialized, setIsInitialized] =useState(false);
  const navigate = useNavigate();
  const storageAvailable=localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";
      if (accessToken && isValidToken(accessToken) && userID) {
        setSession(accessToken);
        // `api/products/${productId}`
        const response = await axiosInstance.get(`/auth/users/${userID}`);
        const { user } = response.data;
        setIsAuthenticated(true);
        setUser(user);
       console.log("userID",userID)
      } else {
      setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error(error);
        setIsAuthenticated(false);
       
        setUser(null);
    }finally{
       setIsInitialized(true);
    }
  }, [storageAvailable]);


  //  useEffect(() => {
  //   setInitialized(()=>initialize);
  // }, [initialize]);


  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = async (userData: LoginCredentials) => {
    const response = await axiosInstance.post("/auth/login", userData);

    const { accessToken, user } = response.data;

    const userRoleInfo = user?.role;
    // const userRoleInfo = user?.role;
    setUserId(user?.id)
    setUserRole(userRoleInfo);
    console.log("token", user,userRole);
    if (accessToken) {
      setSession(accessToken);
      // navigate('/dashboard');
      if (user.role === "provider") {
        if(user.provider_status){
          navigate("/dashboard");

        }
         navigate("/hospitaldetails");
      } else {
        navigate("/appointments");
      }
    }
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isInitialized, user, userRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
