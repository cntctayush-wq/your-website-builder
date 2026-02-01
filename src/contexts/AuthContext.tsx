import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isLogged: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "dfu@1dev.com";
const ADMIN_PASSWORD = "dfu@1";
const AUTH_STORAGE_KEY = "ai_detect_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, String(isLogged));
  }, [isLogged]);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLogged(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLogged(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
