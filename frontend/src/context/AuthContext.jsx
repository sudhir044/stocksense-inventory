import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("stocksense_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("stocksense_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        if (response.data?.success && response.data?.data) {
          setUser(response.data.data);
          setToken(storedToken);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async ({ email, password }) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data?.success && response.data?.data?.token) {
      const receivedToken = response.data.data.token;
      const receivedUser = response.data.data.user;
      localStorage.setItem("stocksense_token", receivedToken);
      setToken(receivedToken);
      setUser(receivedUser);
      return response.data.data;
    }
    throw new Error(response.data?.message || "Login failed");
  };

  const register = async ({ name, email, password, role = "inventory_manager" }) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
    if (response.data?.success && response.data?.data?.token) {
      const receivedToken = response.data.data.token;
      const receivedUser = response.data.data.user;
      localStorage.setItem("stocksense_token", receivedToken);
      setToken(receivedToken);
      setUser(receivedUser);
      return response.data.data;
    }
    throw new Error(response.data?.message || "Registration failed");
  };

  const logout = () => {
    localStorage.removeItem("stocksense_token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
