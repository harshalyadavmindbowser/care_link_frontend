import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
type UserRole = 'doctor' | 'patient' | null;
interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole;
  email: string | null;
  login: (role: UserRole, email: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole>(null);
  const [email, setEmail] = useState<string | null>(null);
  const login = (userRole: UserRole, userEmail: string) => {
    setIsAuthenticated(true);
    setRole(userRole);
    setEmail(userEmail);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setEmail(null);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, role, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
//custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('ushould be within an AuthProvider');
  }
  return context;
};








