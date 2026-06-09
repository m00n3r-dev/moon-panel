"use client";

import { createContext, useContext } from "react";

export interface User {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthContextValue {
  user: User;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useUser(): User {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context.user;
}
