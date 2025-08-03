import { useState, useEffect } from "react";


import Login from "../pages/login/Login";
import { useAuth } from "../context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------
type AuthGuardProps = {
  children: React.ReactNode;
};
export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { isAuthenticated } = useAuth();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, requestedLocation,navigate]);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Login />;
  }
  return <> {children} </>;
}
