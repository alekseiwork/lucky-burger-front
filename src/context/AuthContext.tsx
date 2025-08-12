import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; 
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const logoutTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const loginTime = Date.now();
    localStorage.setItem('loginTime', String(loginTime));
    setIsAuthenticated(true);

    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, 3600000);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    setIsAuthenticated(false);
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = undefined;
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');
    if (token && loginTime) {
      const timeElapsed = Date.now() - Number(loginTime);
      if (timeElapsed < 3600000) {
        setIsAuthenticated(true);
        logoutTimerRef.current = setTimeout(() => {
          logout();
        }, 3600000 - timeElapsed);
      } else {
        logout();
      }
    }

    setIsLoading(false); 

    return () => {
      clearTimeout(logoutTimerRef.current);
    };
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
