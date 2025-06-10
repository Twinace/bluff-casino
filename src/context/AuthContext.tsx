// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
  getProfile,
  logout as apiLogout,
} from "@/lib/auth";

interface User {
  id: string;
  email: string;
  username: string;
  joinDate: string;
  referralCode?: string;
  // add more fields if needed based on your API response
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    agreedToTerms: boolean,
    referralCode?: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    }
  }, []);

  async function fetchUserProfile(token: string) {
    try {
      const profile = await getProfile(token);
      setUser(profile.data.user);
    } catch (err: any) {
      console.error(err);
      // optional: log out ONLY on 401/403
      if (err.message?.includes("401") || err.message?.includes("403")) {
        logout();
      }
    }
  }

  async function login(usernameOrEmail: string, password: string) {
    setLoading(true);
    setError("");
    console.log("Logging in with:", { usernameOrEmail, password });
    try {
      const res = await apiLogin({ usernameOrEmail, password });

      const { accessToken } = res.data;
      console.log("Login successful, received data:", res);
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      await fetchUserProfile(accessToken);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function register(
    username: string,
    email: string,
    password: string,
    agreedToTerms: boolean,
    referralCode?: string
  ) {
    setLoading(true);
    setError("");
    try {
      const res = await apiRegister({
        username,
        email,
        password,
        agreedToTerms,
        referralCode,
      });
      console.log("Registration successful, received data:", res);

      const { accessToken, user } = res.data;

      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      await fetchUserProfile(accessToken);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    apiLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
