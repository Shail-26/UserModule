"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      _id
      name
      email
    }
  }
`;

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => { },
  logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const apolloClient = useApolloClient();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, loading: queryLoading } = useQuery(GET_USER_INFO, {
    skip: !isClient || !localStorage.getItem("token"),
  });

  useEffect(() => {
    if (data?.getUserInfo) {
      setUser(data.getUserInfo);
    }
    setLoading(queryLoading);
  }, [data, queryLoading]);

  const login = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("token", token);
      // Dispatch custom event for login
      window.dispatchEvent(new Event('authChange'));
    }
    // The user data will be fetched automatically by the GET_USER_INFO query
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      // Dispatch custom event for logout
      window.dispatchEvent(new Event('authChange'));
    }
    setUser(null);
    // Clear Apollo cache to ensure fresh data on next login
    await apolloClient.resetStore();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
