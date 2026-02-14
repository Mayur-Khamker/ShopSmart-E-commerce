import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AUTH_KEY = "shopsmart_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) setToken(saved);
  }, []);

  const login = ({ email, password }) => {
    // Fake login validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Fake token
    const fakeToken = `token_${Date.now()}`;
    localStorage.setItem(AUTH_KEY, fakeToken);
    setToken(fakeToken);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setToken(null);
  };

  const value = useMemo(() => {
    return {
      token,
      isLoggedIn: Boolean(token),
      login,
      logout,
    };
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
