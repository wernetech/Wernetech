"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  id: number;
  email: string;
  admin: boolean;
  name: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  confirmLogout: boolean;
  setConfirmLogout: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  checkAuth: async () => {},
  logout: async () => {},
  confirmLogout: false,
  setConfirmLogout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    const boot = async () => {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setUser(user);
        } catch {
          localStorage.removeItem("user");
        }
      }

      await checkAuth();
    };

    boot();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const user: UserType = await res.json();
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(user));
    } catch {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        checkAuth,
        logout,
        confirmLogout,
        setConfirmLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
