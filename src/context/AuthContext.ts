import {  createContext } from "react";

interface User {
  email: string;
  password:string,
  full_name:string |null;

}


interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean; 
  isInitialized: boolean;
  user: User | null;
  login: (userData: LoginCredentials) => void;
  logout: () => void;

  userRole: string |null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);